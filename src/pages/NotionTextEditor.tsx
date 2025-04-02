import { Toaster } from "sonner";

import { PlateEditor } from "@/components/editor/plate-editor";
import { SettingsProvider } from "@/components/editor/settings";

export default function NotionTextEditor({ setValue, value }: {setValue: (value: any) => void, value: any }) {
  return (
    <div className="h-screen w-full" data-registry="plate">
      <SettingsProvider>
        <PlateEditor setValue={setValue} value={value}/>
      </SettingsProvider>
      <Toaster />
    </div>
  );
}
