#!/usr/bin/env python3
import json, sys, urllib.request, urllib.error, random
from pathlib import Path

SERVER = "http://127.0.0.1:8188"
BASE = Path(__file__).resolve().parent
WORKFLOW_FILE = BASE / "workflow_api.json"
SCENES_FILE = BASE / "scenes.json"

def post_prompt(workflow):
    data = json.dumps({"prompt": workflow, "client_id": "hardlyworld-batch"}).encode("utf-8")
    req = urllib.request.Request(SERVER + "/prompt", data=data, headers={"Content-Type": "application/json"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return json.loads(r.read().decode("utf-8"))

def set_text_by_title(workflow, needles, value):
    for node in workflow.values():
        title = str(node.get("_meta", {}).get("title", "")).lower()
        if any(n.lower() in title for n in needles):
            if "text" in node.get("inputs", {}):
                node["inputs"]["text"] = value
                return True
    return False

def update_title_inputs(workflow, needles, updates):
    for node in workflow.values():
        title = str(node.get("_meta", {}).get("title", "")).lower()
        if any(n.lower() in title for n in needles):
            for key, value in updates.items():
                if key in node.get("inputs", {}):
                    node["inputs"][key] = value

def randomize_seeds(workflow):
    for node in workflow.values():
        for key, value in list(node.get("inputs", {}).items()):
            if "seed" in key.lower() and isinstance(value, int):
                node["inputs"][key] = random.randint(1, 2147483647)

def main():
    if not WORKFLOW_FILE.exists():
        print("Не найден workflow_api.json")
        print("В ComfyUI: Save -> Save (API Format), затем сохрани файл рядом со скриптом.")
        sys.exit(1)
    scenes = json.loads(SCENES_FILE.read_text(encoding="utf-8"))
    workflow = json.loads(WORKFLOW_FILE.read_text(encoding="utf-8"))
    if isinstance(workflow.get("prompt"), dict):
        workflow = workflow["prompt"]

    for i, scene in enumerate(scenes, 1):
        wf = json.loads(json.dumps(workflow))
        if not set_text_by_title(wf, ["positive prompt", "positive"], scene["prompt"]):
            print(f"[{i}/{len(scenes)}] Positive Prompt не найден — пропуск {scene['id']}")
            continue

        update_title_inputs(wf, ["video size", "step 2"],
                            {"width": 640, "height": 320, "length": 81, "batch_size": 1})
        randomize_seeds(wf)
        update_title_inputs(wf, ["save video", "video combine", "save"],
                            {"filename_prefix": f"HardlyWorld/scene_{scene['id']}_{scene['title']}"})

        try:
            r = post_prompt(wf)
            print(f"[{i:02d}/{len(scenes)}] scene_{scene['id']} — {scene['title']} — в очереди ({r.get('prompt_id','?')})")
        except Exception as e:
            print(f"Остановка: {e}")
            sys.exit(1)

    print("\nГотово. Все сцены отправлены в очередь ComfyUI.")

if __name__ == "__main__":
    main()
