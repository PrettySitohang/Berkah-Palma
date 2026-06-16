import React from 'react';

export default function PageHeader({ title, breadcrumb, children }) {
    return (
        <div id="pageheader-container" className="flex items-center justify-between p-4">
            <div id="pageheader-left" className="flex flex-col">
                {/* Title diambil dari props */}
                <span id="page-title" className="text-3xl font-semibold">
                    {title}
                </span>
                
                {/* Breadcrumb dinamis dari props */}
                <div id="breadcrumb-links" className="flex items-center font-medium space-x-2 mt-2">
                    {Array.isArray(breadcrumb) ? (
                        breadcrumb.map((item, index) => (
                            <React.Fragment key={index}>
                                <span className="text-gray-500">{item}</span>
                                {/* Menambahkan pemisah "/" jika bukan item terakhir */}
                                {index < breadcrumb.length - 1 && (
                                    <span className="text-gray-500">/</span>
                                )}
                            </React.Fragment>
                        ))
                    ) : (
                        <span className="text-gray-500">{breadcrumb}</span>
                    )}
                </div>
            </div>
            
            {/* Children digunakan untuk merender tombol apapun yang disisipkan saat komponen dipanggil */}
            <div id="action-button">
                {children}
            </div>
        </div>
    );
}