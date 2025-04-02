"use client";

import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import {
  Plate,
  type PlateEditor
} from "@udecode/plate/react";

import { useCreateEditor } from "@/components/editor/use-create-editor";
// import { SettingsDialog } from "@/components/editor/settings";
import { Editor, EditorContainer } from "@/components/plate-ui/editor";

export function PlateEditor({
  readOnly,
  setValue,
  value,
}: {
  setValue: (value: any) => void;
  value: any;
  readOnly?: boolean;
}) {
  const editor = useCreateEditor({
    value: value,
  }) as PlateEditor;

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        editor={editor}
        onChange={({ value }) => {
          setValue(value);
        }}
        readOnly={readOnly}
      >
        <EditorContainer>
          <Editor readOnly={readOnly} variant="fullWidth" className="!p-0 scrollbar-hide" />
        </EditorContainer>
        {/* <SettingsDialog /> */}
      </Plate>
    </DndProvider>
  );
}

