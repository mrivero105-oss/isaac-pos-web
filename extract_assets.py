import pymupdf
import os
import shutil

output_dir = r"c:\AndroidStudioProjects\Isaac Page\public\real-system"
products_dir = r"c:\AndroidStudioProjects\Isaac Page\public\real-products"
os.makedirs(output_dir, exist_ok=True)
os.makedirs(products_dir, exist_ok=True)

# 1. Renderizar páginas del catálogo a alta resolución (2x DPI para ultra nitidez)
catalog_path = r"C:\Users\mrive\Desktop\Catalogo_American_POS_2026.pdf"
doc = pymupdf.open(catalog_path)
zoom = 2.0  # 2x zoom para pantallas retina
mat = pymupdf.Matrix(zoom, zoom)

names = {
    0: "00_portada_sistema.png",
    1: "01_inteligencia_ejecutiva_dashboard.png",
    2: "02_terminal_ventas_pos.png",
    3: "03_control_inventario.png",
    4: "04_flash_engine_ia_crm.png"
}

for i, page in enumerate(doc):
    pix = page.get_pixmap(matrix=mat)
    filename = names.get(i, f"pagina_{i+1}.png")
    out_path = os.path.join(output_dir, filename)
    pix.save(out_path)
    print(f"Guardado catálogo 1 página {i+1}: {out_path}")

# También procesar el catálogo integral
integral_path = r"C:\Users\mrive\Desktop\Catalogo_American_POS_Integral_2026.pdf"
doc_int = pymupdf.open(integral_path)
names_int = {
    1: "integral_01_punto_de_venta.png",
    2: "integral_02_reportes_inteligencia.png",
    3: "integral_03_historial_ventas.png",
    4: "integral_04_clientes_y_cuentas_cobrar.png",
    5: "integral_05_suministros_inventario.png",
    6: "integral_06_importador_inteligente_ia.png",
    7: "integral_07_proveedores_compras.png",
    8: "integral_08_gastos_y_sucursales.png",
    9: "integral_09_configuracion_multimoneda.png"
}

for i, page in enumerate(doc_int):
    if i in names_int:
        pix = page.get_pixmap(matrix=mat)
        out_path = os.path.join(output_dir, names_int[i])
        pix.save(out_path)
        print(f"Guardado catálogo integral página {i+1}: {out_path}")

# 2. Copiar algunos productos reales emblemáticos de "Productos Sistema" para el simulador
sample_products = [
    "arroz primor 500grs.png",
    "cafe amanecer de 500g.png",
    "aceite vatel 1l.png",
    "harina pan.png",
    "Natuchips 150grs.png",
    "PEPSI.jpg",
    "pasta primor 500grs.png",
    "leche amanecer.png"
]

source_prods_dir = r"C:\AndroidStudioProjects\Productos Sistema"
for prod in sample_products:
    src = os.path.join(source_prods_dir, prod)
    if os.path.exists(src):
        dst = os.path.join(products_dir, prod.replace(" ", "_").lower())
        shutil.copy2(src, dst)
        print(f"Copiado producto real: {dst}")

print("¡Extracción completada con éxito!")
