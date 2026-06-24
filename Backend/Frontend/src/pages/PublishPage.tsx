import { useState } from "react";
import { ArrowLeft, Upload } from "lucide-react";

// 1. Aquí definimos que este componente SÍ recibe onDone
interface PublishPageProps {
  onDone: () => void;
}

export default function PublishPage({ onDone }: PublishPageProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Aquí iría tu lógica para subir al backend
    console.log("Subiendo obra:", { title, description });
    
    // Una vez terminado, llamamos a onDone para regresar al Hub
    onDone();
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-4 mb-8">
        <button 
          onClick={onDone}
          className="p-2 rounded-lg hover:bg-secondary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 style={{ fontFamily: "'Playfair Display', serif" }} className="text-2xl font-bold">
          Publish Artwork
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border-2 border-dashed border-border rounded-xl p-12 flex flex-col items-center justify-center text-muted-foreground hover:bg-secondary/50 hover:border-primary/50 transition-colors cursor-pointer">
          <Upload className="w-8 h-8 mb-4" />
          <p className="font-medium">Click to upload or drag and drop</p>
          <p className="text-xs mt-1">PNG, JPG or WEBP (Max 10MB)</p>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border focus:outline-none focus:border-primary/60 transition-colors"
            placeholder="Give your artwork a name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
            className="w-full px-4 py-2.5 rounded-lg bg-secondary border border-border focus:outline-none focus:border-primary/60 transition-colors resize-none"
            placeholder="Tell us about your process, tools, or inspiration..."
          />
        </div>

        <div className="flex justify-end pt-4">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:bg-primary/90 transition-colors"
          >
            Publish Now
          </button>
        </div>
      </form>
    </div>
  );
}