import { useEffect, useState } from "react";
import { getProducts } from "../services/productService";
import ProductCard from "../components/ProductCard";

function Home() {
  const [products, setProducts] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getProducts();
        setProducts(data);
      } catch (err) {
        console.log(err);
        alert("Không load được sản phẩm");
      }
    };

    fetchData();
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-3">
          Danh mục sản phẩm
        </h2>
        <p className="text-gray-500">
          Khám phá những sản phẩm chất lượng tốt nhất
        </p>
      </div>

      {/* Empty State */}
      {products.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-md p-10 text-center">
          <p className="text-gray-600">Chưa có sản phẩm nào.</p>
        </div>
      ) : (
        <div className="
          grid 
          grid-cols-1 
          sm:grid-cols-2 
          lg:grid-cols-3 
          xl:grid-cols-4 
          gap-8
        ">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;