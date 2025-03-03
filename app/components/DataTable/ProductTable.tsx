/* eslint-disable @next/next/no-img-element */
"use client";

import { Table, Pagination, Spinner } from "flowbite-react";
import {
  fetchProducts,
  deleteProduct,
  Product,
} from "@/app/api/mock/productService";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function ProductTable() {
  const [products, setProducts] = useState<Product[]>([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [deleting, setDeleting] = useState(false);
  const [deleteError, setDeleteError] = useState<string | null>(null);
  const [deleteSuccess, setDeleteSuccess] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProducts();
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products. Please try again.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, []);

  const handleDelete = async (productId: number) => {
    setDeleting(true);
    setDeleteError(null);
    setDeleteSuccess(null);

    try {
      await deleteProduct(productId);

      setProducts((prevProducts) =>
        prevProducts.filter((p) => p.id !== productId)
      );
      setDeleteSuccess("Product deleted successfully!");
    } catch (error) {
      console.error(error);
      setDeleteError("Failed to update product. Please try again.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96 bg-opacity-5">
        <Spinner size="lg" aria-label="Loading..." />
      </div>
    );
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="overflow-x-auto max-w-full min-w-96 border border-slate-100 rounded-lg">
      <Table hoverable>
        <Table.Head className="bg-blue-200">
          <Table.HeadCell>รหัสสินค้า</Table.HeadCell>
          <Table.HeadCell>รูปภาพ</Table.HeadCell>
          <Table.HeadCell>ชื่อสินค้า</Table.HeadCell>
          <Table.HeadCell>หมวดหมู่</Table.HeadCell>
          <Table.HeadCell>ราคา</Table.HeadCell>
          <Table.HeadCell>สต็อก</Table.HeadCell>
          <Table.HeadCell>สถานะ</Table.HeadCell>
          <Table.HeadCell>จัดการ</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {products && products.length > 0 ? (
            paginatedProducts.map((product, index) => (
              <Table.Row
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
                key={index}
              >
                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {product.id}
                </Table.Cell>
                <Table.Cell>
                  <img
                    src={product.thumbnail}
                    height={0}
                    width={0}
                    alt={product.title}
                    className="w-16 h-auto object-cover object-center rounded-lg"
                  />
                </Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.category}</Table.Cell>
                <Table.Cell>{product.price}</Table.Cell>
                <Table.Cell>{product.stock}</Table.Cell>
                <Table.Cell>{product.availabilityStatus}</Table.Cell>
                <Table.Cell>
                  <Link
                    href={`/dashboard/product/${product.id}?name=${product.title}`}
                    className="font-medium text-cyan-600 hover:underline dark:text-cyan-500 mr-4"
                  >
                    จัดการ
                  </Link>
                  <button
                    onClick={() => handleDelete(product.id)}
                    disabled={deleting}
                    className="font-medium text-red-600 hover:underline dark:text-red-500"
                  >
                    ลบ
                  </button>
                </Table.Cell>
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={8} className="text-center">
                No products found.
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>

      <div className="flex justify-end mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
