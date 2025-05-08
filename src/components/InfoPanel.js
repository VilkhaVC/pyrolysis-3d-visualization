import React from 'react';
import '../styles/InfoPanel.css';

const InfoPanel = ({ selectedComponent, setShowInfo }) => {
  return (
    <div className="info-panel">
      <div className="info-panel-header">
        <h2>{selectedComponent ? selectedComponent.name : 'Proses Pirolisis Oli Bekas'}</h2>
        <button className="close-button" onClick={() => setShowInfo(false)}>×</button>
      </div>
      
      <div className="info-panel-content">
        {selectedComponent ? (
          <>
            <div className="info-section">
              <h3>Deskripsi</h3>
              <p>{selectedComponent.description}</p>
            </div>
            
            <div className="info-section">
              <h3>Fungsi</h3>
              <p>{selectedComponent.function}</p>
            </div>
            
            <div className="info-section">
              <h3>Spesifikasi</h3>
              <p>{selectedComponent.specs}</p>
            </div>
          </>
        ) : (
          <div className="process-overview">
            <h3>Gambaran Proses</h3>
            <p>
              Pirolisis adalah proses dekomposisi termal bahan organik pada suhu tinggi 
              tanpa kehadiran oksigen. Dalam konteks pengolahan oli bekas, pirolisis 
              mengubah oli bekas menjadi produk yang bermanfaat seperti minyak bakar, 
              gas, dan residu karbon.
            </p>
            
            <h3>Tahapan Proses</h3>
            <ol>
              <li><strong>Persiapan Bahan Baku</strong> - Oli bekas disaring dan dipersiapkan dalam tangki umpan.</li>
              <li><strong>Pemanasan</strong> - Oli dipanaskan dalam reaktor pirolisis pada suhu 400-600°C.</li>
              <li><strong>Pirolisis</strong> - Terjadi dekomposisi termal menghasilkan uap hidrokarbon.</li>
              <li><strong>Kondensasi</strong> - Uap didinginkan dalam kondenser menjadi cairan.</li>
              <li><strong>Pemisahan</strong> - Produk dipisahkan menjadi minyak dan gas dalam tangki pemisah.</li>
              <li><strong>Penyimpanan</strong> - Minyak dan gas disimpan dalam tangki penyimpanan masing-masing.</li>
            </ol>
            
            <h3>Tips Eksplorasi</h3>
            <p>
              Klik pada peralatan di model 3D untuk melihat informasi detail tentang komponen tersebut.
              Gunakan mouse untuk memutar, zoom, dan menggeser pandangan 3D.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoPanel;
