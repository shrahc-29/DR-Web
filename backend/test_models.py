from tensorflow.keras.models import load_model

models = [
    "model/efficientnetb0_final_continued.h5",
    "model/efficientnetb0_ddr_best.h5",
    "model/efficientnetb0_continued_best.h5",
]

for path in models:
    try:
        print(f"\nLoading: {path}")

        model = load_model(path)

        print("SUCCESS")
        print("Input Shape :", model.input_shape)
        print("Output Shape:", model.output_shape)

    except Exception as e:
        print("FAILED")
        print(e)