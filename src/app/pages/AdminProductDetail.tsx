
import React, { useState } from "react";
import { Product } from "../types";

export default function AdminProductDetail() {

  const [isEditing, setIsEditing] = useState(false);
  const [showAddMaterial, setShowAddMaterial] = useState(false);
  const [showAddSize, setShowAddSize] = useState(false);

  const [newMaterial, setNewMaterial] = useState("");
  const [newSize, setNewSize] = useState("");

  const [productData, setProductData] = useState<Product>({
    id: "1",
    name: "Anillo Oro",
    description: "Anillo elegante",
    price: 150,
    category: "rings",
    materials: [
      { type: "gold", images: [] },
      { type: "silver", images: [] }
    ],
    sizes: ["5","6","7","8","9","10"],
    stock: 10,
    active: true,
    soldCount: 0,
    reviews: [],
    targetGender: "ella"
  });

  const removeMaterial = (material: string) => {
    setProductData({
      ...productData,
      materials: productData.materials.filter(
        (m) => m.type !== material
      )
    });
  };

  const addMaterial = () => {
    if (!newMaterial) return;

    setProductData({
      ...productData,
      materials: [
        ...productData.materials,
        { type: newMaterial, images: [] }
      ]
    });

    setNewMaterial("");
    setShowAddMaterial(false);
  };

  const removeSize = (size: string) => {
    setProductData({
      ...productData,
      sizes: productData.sizes?.filter(
        (s) => s !== size
      )
    });
  };

  const addSize = () => {
    if (!newSize) return;

    setProductData({
      ...productData,
      sizes: [...(productData.sizes || []), newSize]
    });

    setNewSize("");
    setShowAddSize(false);
  };

  return (
    <div className="min-h-screen bg-[#f5f5f7]">

      <div className="max-w-[1400px] mx-auto px-4 py-8">

        <h1 className="text-3xl font-bold mb-6">
          Detalle del Producto
        </h1>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">

          <h2 className="text-xl font-semibold mb-4">
            Información General
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label>Nombre</label>
              <input
                className="w-full border p-2 rounded"
                value={productData.name}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    name: e.target.value
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div>
              <label>Precio</label>
              <input
                type="number"
                className="w-full border p-2 rounded"
                value={productData.price}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    price: Number(e.target.value)
                  })
                }
                disabled={!isEditing}
              />
            </div>

            <div className="md:col-span-2">
              <label>Descripción</label>
              <textarea
                className="w-full border p-2 rounded"
                value={productData.description}
                onChange={(e) =>
                  setProductData({
                    ...productData,
                    description: e.target.value
                  })
                }
                disabled={!isEditing}
              />
            </div>

          </div>

        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm mb-6">

          <h2 className="text-xl font-semibold mb-4">
            Materiales Disponibles
          </h2>

          <div className="flex flex-wrap gap-2">

            {productData.materials.map((material) => (
              <div
                key={material.type}
                className="bg-gray-100 px-3 py-1 rounded flex items-center gap-2"
              >
                {material.type}

                {isEditing && (
                  <button
                    onClick={() => removeMaterial(material.type)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {isEditing && (
              <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => setShowAddMaterial(true)}
              >
                +
              </button>
            )}

          </div>

          {showAddMaterial && (
            <div className="mt-4 flex gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Nuevo material"
                value={newMaterial}
                onChange={(e) =>
                  setNewMaterial(e.target.value)
                }
              />

              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={addMaterial}
              >
                Añadir
              </button>

              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() =>
                  setShowAddMaterial(false)
                }
              >
                Cancelar
              </button>
            </div>
          )}

        </div>

        <div className="bg-white rounded-lg p-6 shadow-sm">

          <h2 className="text-xl font-semibold mb-4">
            Tallas Disponibles
          </h2>

          <div className="flex flex-wrap gap-2">

            {productData.sizes?.map((size) => (
              <div
                key={size}
                className="bg-gray-100 px-3 py-1 rounded flex items-center gap-2"
              >
                {size}

                {isEditing && (
                  <button
                    onClick={() => removeSize(size)}
                  >
                    ✕
                  </button>
                )}
              </div>
            ))}

            {isEditing && (
              <button
                className="bg-gray-200 px-3 py-1 rounded"
                onClick={() => setShowAddSize(true)}
              >
                +
              </button>
            )}

          </div>

          {showAddSize && (
            <div className="mt-4 flex gap-2">
              <input
                className="border p-2 rounded"
                placeholder="Nueva talla"
                value={newSize}
                onChange={(e) =>
                  setNewSize(e.target.value)
                }
              />

              <button
                className="bg-green-500 text-white px-4 py-2 rounded"
                onClick={addSize}
              >
                Añadir
              </button>

              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() =>
                  setShowAddSize(false)
                }
              >
                Cancelar
              </button>
            </div>
          )}

        </div>

        <div className="mt-6">

          <button
            className="bg-purple-600 text-white px-6 py-2 rounded"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Guardar" : "Editar"}
          </button>

        </div>

      </div>

    </div>
  );
}
