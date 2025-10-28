import LocationComponent from "@/components/LocationComponent";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-start h-full overflow-x-hidden mt-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Araç Kiralama Uygulaması
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Hoş geldiniz! Araç kiralamak için menüden &quot;Araç Kirala&quot;
          seçeneğini kullanabilirsiniz.
        </p>

        <LocationComponent />
      </div>
    </div>
  );
}
