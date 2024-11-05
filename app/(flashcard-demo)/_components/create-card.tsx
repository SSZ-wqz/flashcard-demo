"use client";

import { Card } from "../_interfaces/card-types"
import { useState } from "react";

interface CreateCardProps {
  onCreateCard: (card: Omit<Card, "id">) => void;
}

export default function CreateCard({ onCreateCard }: CreateCardProps) {
  const [formData, setFormData] = useState<Omit<Card, "id">>({
    title: "",
    description: "",
    date: "",
    isArchived: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.date) {
      alert("All fields are required!");
      return;
    }
    onCreateCard(formData);
    setFormData({
      title: "",
      description: "",
      date: "",
      isArchived: false,
    });
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  }

  return (
    <div className="min-h-screen w-2/3 mr-2 mt-4 rounded-lg">
      <header className="flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold">Create Card</h1>
        <button 
          onClick={handleSubmit}
          className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Create
        </button>
      </header>
      <main className="p-4">
        <form autoComplete="off" onSubmit={handleSubmit}>
          <div className="flex gap-4">
            <div className="flex flex-col gap-2 flex-1">
              <label htmlFor="title">Title</label>
              <input
                type="text"
                id="title"
                placeholder="enter title..."
                className="border border-gray-300 rounded-md p-2 pl-4 outline-none"
                value={formData.title}
                onChange={handleChange}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="date">Date</label>
              <input
                type="date"
                id="date"
                placeholder="enter date..."
                className="border border-gray-300 rounded-md p-2 pl-4 outline-none"
                value={formData.date}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="description">Description</label>
            <textarea
              id="description"
              placeholder="enter description..."
              className="border border-gray-300 rounded-md p-2 pl-4 outline-none resize-none"
              rows={12}
              cols={50}
              value={formData.description}
              onChange={handleChange}
            />
          </div>
        </form>
      </main>
    </div>
  );
}
