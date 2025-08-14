import { useState, useEffect } from "react";
import { getProducts } from "../../services/productAPI";

export default function StepSelectProducts({
  data,
  updateData,
  nextStep,
  prevStep,
}) {
  const [products, setProducts] = useState([]);
  const [query, setQuery] = useState("");
  const [qtyMap, setQtyMap] = useState({}); // track quantities for added products

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const result = await getProducts();
    setProducts(result);
  }

  function addProduct(product) {
    // prevent adding twice
    if (!data.items.find((item) => item.productId === product._id)) {
      const newItem = {
        productId: product._id,
        quantity: 1,
        price: product.price, // assuming backend field is price
        productObj: product, // <-- ADD THIS
      };
      updateData({ items: [...data.items, newItem] });
      setQtyMap({ ...qtyMap, [product._id]: 1 });
    }
  }

  function removeProduct(productId) {
    updateData({
      items: data.items.filter((item) => item.productId !== productId),
    });
    const newQtyMap = { ...qtyMap };
    delete newQtyMap[productId];
    setQtyMap(newQtyMap);
  }

  function updateQuantity(productId, quantity) {
    quantity = Math.max(1, quantity); // min 1
    const updatedItems = data.items.map((item) =>
      item.productId === productId ? { ...item, quantity } : item
    );
    updateData({ items: updatedItems });
    setQtyMap({ ...qtyMap, [productId]: quantity });
  }

  function handleNext() {
    if (data.items.length === 0) {
      alert("Please select at least one product");
      return;
    }
    nextStep();
  }

  const inputBase =
    "w-full px-4 py-2 border-2 rounded-lg shadow-sm focus:border-blue-600 focus:ring-2 focus:ring-blue-100 transition text-black bg-white";

  return (
    <div>
      {/* Search Bar */}
      <input
        type="text"
        placeholder="🔎 Search product by name or code…"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={`${inputBase} mb-3 font-semibold text-lg placeholder-gray-400`}
      />

      {/* Product List */}
      <div className="space-y-2 max-h-[30vh] overflow-y-auto mb-4">
        {products
          .filter(
            (p) =>
              p.product_name.toLowerCase().includes(query.toLowerCase()) ||
              p.product_code.toLowerCase().includes(query.toLowerCase())
          )
          .map((p) => (
            <div
              key={p._id}
              className="p-3 border rounded-xl flex justify-between items-center hover:bg-blue-50 transition"
            >
              <div>
                <div className="font-bold text-blue-700">{p.product_name}</div>
                <div className="text-xs text-gray-500">
                  Code: {p.product_code}
                </div>
                <div className="text-sm text-gray-700">Price: {p.price}</div>
              </div>
              <button
                onClick={() => addProduct(p)}
                className="px-3 py-1 bg-green-600 hover:bg-green-700 text-white rounded"
              >
                Add
              </button>
            </div>
          ))}
      </div>

      {/* Selected Products */}
      {data.items.length > 0 && (
        <div>
          <h3 className="font-bold text-lg mb-2 text-blue-700">
            Selected Products
          </h3>
          <div className="space-y-2 max-h-[25vh] overflow-y-auto">
            {data.items.map((item) => {
              const product = products.find((p) => p._id === item.productId);
              return (
                <div
                  key={item.productId}
                  className="bg-gradient-to-r from-indigo-50 via-white to-indigo-100 p-4 border border-indigo-200 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between shadow"
                >
                  {/* Info Column */}
                  <div className="flex-1 min-w-0">
                    <div className="font-extrabold text-base sm:text-lg text-indigo-800 truncate">
                      {product?.product_name || "Product"}
                    </div>
                    <div className="text-xs text-gray-600 mt-1">
                      <span className="font-medium">Code:</span>{" "}
                      {product?.product_code}
                      <span className="ml-3 font-medium">Price:</span>
                      <span className="ml-1 text-black">{item.price}</span>
                    </div>
                  </div>
                  {/* Quantity and Remove column */}
                  <div className="mt-2 sm:mt-0 sm:ml-4 flex items-center gap-2">
                    <div className="flex items-center">
                      <label
                        className="mr-2 font-semibold text-black"
                        htmlFor={`qty-${item.productId}`}
                      >
                        Qty:
                      </label>
                      <input
                        id={`qty-${item.productId}`}
                        type="number"
                        min="1"
                        value={qtyMap[item.productId] || item.quantity}
                        onChange={(e) =>
                          updateQuantity(
                            item.productId,
                            parseInt(e.target.value, 10)
                          )
                        }
                        className="w-20 text-black text-center border-2 border-indigo-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-indigo-400 focus:ring-2 font-semibold bg-white"
                      />
                    </div>
                    <button
                      onClick={() => removeProduct(item.productId)}
                      className="w-8 h-8 flex items-center justify-center rounded-full bg-red-500 hover:bg-red-700 text-white text-base ml-1 shadow transition"
                      title="Remove"
                      type="button"
                    >
                      &times;
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Navigation */}
      <div className="flex justify-between gap-3 mt-6">
        <button
          onClick={prevStep}
          className="px-5 py-2 rounded-lg bg-gray-200 text-gray-700 font-semibold hover:bg-gray-300 shadow"
        >
          Back
        </button>
        <button
          onClick={handleNext}
          className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow"
        >
          Next
        </button>
      </div>
    </div>
  );
}
