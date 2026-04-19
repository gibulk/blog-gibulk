import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tentang Gibulk',
  description: 'Gibulk adalah penulis dan analis geopolitik, geografi, dan ekonomi global. Membagikan analisis mendalam tentang isu-isu internasional dan tren ekonomi.',
}

export default function TentangPage() {
  return (
    <div className="container mx-auto px-4 py-12 max-w-3xl">
      <h1 className="text-4xl font-bold mb-8 text-center">Tentang Gibulk</h1>
      
      <div className="prose prose-lg dark:prose-invert mx-auto">
        <p className="lead text-xl text-gray-600 dark:text-gray-400">
          Gibulk adalah seorang penulis dan analis yang berfokus pada isu geopolitik, 
          geografi, dan ekonomi global.
        </p>
        
        <h2>Latar Belakang</h2>
        <p>
          Dengan pengalaman bertahun-tahun dalam menganalisis dinamika politik internasional, 
          perubahan lanskap geografis, dan tren ekonomi global, Gibulk berkomitmen untuk 
          memberikan perspektif yang mendalam dan mudah dipahami.
        </p>
        
        <h2>Fokus Analisis</h2>
        <ul>
          <li>
            <strong>Geopolitik:</strong> Analisis hubungan internasional, konflik, 
            dan dinamika kekuasaan global.
          </li>
          <li>
            <strong>Geografi:</strong> Studi tentang dampak geografis terhadap 
            kebijakan, populasi, dan sumber daya.
          </li>
          <li>
            <strong>Ekonomi Global:</strong> Tren pasar, kebijakan moneter, 
            perdagangan internasional, dan proyeksi ekonomi.
          </li>
        </ul>
        
        <h2>Misi</h2>
        <p>
          Memberikan analisis yang akurat, berimbang, dan mendalam untuk membantu 
          pembaca memahami kompleksitas dunia modern. Setiap artikel ditulis dengan 
          riset mendalam dan perspektif yang kritis.
        </p>
        
        <h2>Kontak</h2>
        <p>
          Untuk pertanyaan, kolaborasi, atau diskusi lebih lanjut, silakan hubungi 
          melalui platform profesional terkait.
        </p>
      </div>
    </div>
  )
}
