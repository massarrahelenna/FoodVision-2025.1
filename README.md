🍽️ Sistema Inteligente de Análise de Desperdício Alimentar via Visão Computacional
📌 Visão Geral
Este projeto propõe o desenvolvimento de um sistema inteligente baseado em Visão Computacional e Deep Learning para identificar, segmentar e estimar o desperdício alimentar em pratos ou bandejas após o consumo.

A solução é voltada especialmente para ambientes de alimentação coletiva, como restaurantes universitários e refeitórios corporativos, onde atualmente o controle de sobras é feito de forma manual e pouco informativa.

Utilizando segmentação de instância com YOLO, o sistema fornece dados granulares sobre quais alimentos são mais desperdiçados, auxiliando gestores na tomada de decisões para redução do desperdício na fonte.

🎯 Objetivos
Objetivo Geral
Desenvolver um sistema de software capaz de identificar, segmentar e estimar o volume/peso de resíduos alimentares a partir de imagens ou vídeo em tempo real.

Objetivos Específicos
Criar ou adaptar um dataset de imagens de alimentos em estado de sobra (pós-consumo).
Treinar um modelo de Segmentação de Instância utilizando YOLO (v8-seg).
Estimar o peso/volume de resíduos com base na área segmentada em pixels.
Disponibilizar métricas de desperdício para apoio à tomada de decisão.
🧠 Tecnologias Utilizadas
Linguagem: Python 3.10+
Deep Learning: PyTorch
Visão Computacional: OpenCV
Modelo: YOLOv8-seg (Ultralytics)
Anotação de Dados: Roboflow / CVAT
Backend (opcional): FastAPI
Ambiente: Linux (Ubuntu / WSL) com suporte a CUDA
🔬 Metodologia
1️⃣ Coleta e Pré-processamento de Dados
Coleta de imagens reais de pratos/bandejas após o consumo.
Aplicação de Data Augmentation (rotação, brilho, contraste).
2️⃣ Treinamento do Modelo
Uso de Transfer Learning com pesos pré-treinados do YOLOv8-seg.

Fine-tuning para classes específicas de alimentos:

Arroz
Feijão
Carne
Salada
3️⃣ Estimativa de Desperdício
Conversão da área segmentada em pixels para peso estimado:
Peso (g) = Área em Pixels × Fator de Densidade (g/pixel)
O fator de densidade é calibrado experimentalmente usando uma balança de precisão.
4️⃣ Validação e Interface
Avaliação com métricas:

mAP (Mean Average Precision)
IoU (Intersection over Union)
Demonstração em tempo real via webcam.
