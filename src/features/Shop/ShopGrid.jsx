import { useState } from "react";
import { shopItems } from "@/data/shopItems";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const categories = [
  "All",
  "Score Buffs",
  "Avatar Frames",
  "Banners",
  "Song Libraries",
  "VIP",
  "Coins",
  "Gems"
];

export default function Shop() {
  const [filter, setFilter] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [modalItem, setModalItem] = useState(null);

  const filteredItems = filter === "All"
    ? shopItems
    : shopItems.filter(item => item.category === filter);

  const itemsPerPage = 6;
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const paginatedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const openModal = (item) => setModalItem(item);
  const closeModal = () => setModalItem(null);

  return (
    <section className="min-h-screen bg-black py-20 px-6 text-white">
      <motion.h2
        className="text-4xl font-bold text-center text-purple-400 mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Melora Game Shop
      </motion.h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        {categories.map(cat => (
          <Button
            key={cat}
            variant={filter === cat ? "default" : "ghost"}
            className={`px-4 py-2 rounded-lg border ${
              filter === cat
                ? "bg-purple-600 text-white"
                : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
            }`}
            onClick={() => {
              setFilter(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </Button>
        ))}
      </div>

      {/* Item Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {paginatedItems.map(item => (
          <motion.div
            key={item.id}
            className="bg-zinc-900 p-5 rounded-xl shadow-lg flex flex-col items-center text-center"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-28 h-28 object-contain mb-4"
            />
            <h3 className="text-lg font-semibold text-purple-300">{item.name}</h3>
            <p className="text-sm text-gray-400">{item.category}</p>
            <Button
              className="bg-purple-600 hover:bg-purple-700 mt-4"
              onClick={() => openModal(item)}
            >
              Buy for Free
            </Button>
          </motion.div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center gap-2 mt-10">
          {[...Array(totalPages)].map((_, i) => (
            <Button
              key={i}
              onClick={() => setCurrentPage(i + 1)}
              className={`px-3 py-1 text-sm rounded ${
                currentPage === i + 1
                  ? "bg-purple-600 text-white"
                  : "bg-zinc-800 text-gray-300 hover:bg-zinc-700"
              }`}
            >
              {i + 1}
            </Button>
          ))}
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {modalItem && (
          <motion.div
            className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-zinc-900 rounded-xl p-6 w-full max-w-md space-y-4 text-left"
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
            >
              <h3 className="text-xl font-semibold text-purple-300">{modalItem.name}</h3>

              <Input type="number" placeholder="Quantity" className="bg-zinc-800 border border-zinc-700 text-white" />
              <Input type="email" placeholder="Your Email" className="bg-zinc-800 border border-zinc-700 text-white" />
              <Input type="text" placeholder="Game ID" className="bg-zinc-800 border border-zinc-700 text-white" />
              <Input type="password" placeholder="Password" className="bg-zinc-800 border border-zinc-700 text-white" />
              
              <div className="space-y-1">
                <label className="text-sm text-gray-400 flex items-center gap-2">
                  <input type="checkbox" className="accent-purple-500" />
                  Gift for someone?
                </label>
                <p className="text-xs text-teal-400 ml-1">10% discount while gifting</p>
              </div>

              <div className="flex justify-between gap-4 mt-4">
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  onClick={closeModal}
                >
                  Buy for Free
                </Button>
                <Button
                  className="w-full bg-zinc-700 hover:bg-zinc-600"
                  onClick={closeModal}
                >
                  Cancel
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
