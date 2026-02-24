from roboflow import Roboflow
import cv2
import matplotlib.pyplot as plt
from PIL import Image
import numpy as np
import pandas as pd
from google.colab import files
import os

# === Roboflow ===
rf = Roboflow(api_key="0F8rtF0Q8QsBh7H2d1Jv")
project = rf.workspace("processamento-de-imagem-aula").project("my-first-project-lzc3k")
model = project.version(2).model

# === Upload da imagem ===
uploaded = files.upload()
image_path = next(iter(uploaded.keys()))
image = Image.open(image_path)
image_np = np.array(image)

# === Função de melhoria da imagem ===
def enhance_detection(image):
    image = cv2.cvtColor(image, cv2.COLOR_RGB2BGR)
    image = cv2.resize(image, (640, 640))
    return image

processed_img = enhance_detection(image_np)

# === Predição ===
prediction = model.predict(processed_img, confidence=30, overlap=25).json()

# === Visualização ===
def visualize_detections(image, predictions):
    img = image.copy()
    for pred in predictions['predictions']:
        x, y, w, h = int(pred['x']), int(pred['y']), int(pred['width']), int(pred['height'])
        cv2.rectangle(img, (x-w//2, y-h//2), (x+w//2, y+h//2), (0, 0, 255), 2)
        label = f"{pred['class']} {pred['confidence']:.2f}"
        cv2.putText(img, label, (x-w//2, y-h//2-10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (0, 255, 0), 2)
    return img

# === Processar e visualizar ===
if len(prediction['predictions']) > 0:
    result_img = visualize_detections(processed_img, prediction)
    plt.figure(figsize=(12, 8))
    plt.imshow(cv2.cvtColor(result_img, cv2.COLOR_BGR2RGB))
    plt.axis('off')
    plt.title('Detecção de Desperdício de Alimentos')
    plt.show()

    # === Extrair classes e salvar ===
    classes_detectadas = [pred['class'] for pred in prediction['predictions']]
    df = pd.DataFrame(classes_detectadas, columns=["Alimento"])
    
    # Adicionar ou atualizar CSV
    if os.path.exists("dados_alimentos.csv"):
        df_antigo = pd.read_csv("dados_alimentos.csv")
        df_total = pd.concat([df_antigo, df], ignore_index=True)
    else:
        df_total = df
    df_total.to_csv("dados_alimentos.csv", index=False)

    # === Análise ===
    contagem = df_total['Alimento'].value_counts()
    print("\n📊 Alimentos mais desperdiçados:")
    print(contagem.head(5))

    print("\n🚫 Sugestão: evite comprar em excesso os alimentos abaixo (mais deixados no prato):")
    for alimento in contagem.head(3).index:
        print(f" - {alimento}")

    print("\n✅ Alimentos menos desperdiçados (provável consumo completo):")
    for alimento in contagem.tail(3).index:
        print(f" - {alimento}")

else:
    print("⚠️ Nenhum desperdício detectado.")
    plt.imshow(cv2.cvtColor(processed_img, cv2.COLOR_BGR2RGB))
    plt.axis('off')
    plt.title('Imagem Sem Detecções')
    plt.show()
