# HardlyWorld — one-click batch generation

Этот набор снимает необходимость вручную вставлять промпты по одному.

## Один раз
В ComfyUI сохрани текущий рабочий Wan2.1 workflow через **Save (API Format)** как:
workflow_api.json

Положи workflow_api.json рядом с batch_generate.py.

## Запуск
Убедись, что ComfyUI запущен, затем:
- открой PowerShell в этой папке;
- выполни: python batch_generate.py

Скрипт отправит все 28 сцен в очередь ComfyUI автоматически.

Для текущей RTX 3050 6 GB скрипт ставит 640x320, 81 кадр, batch 1.
