import { describe, expect, it } from "vitest";
import { render } from "@testing-library/react";

import Card from "./Card";

describe("Card", () => {
  it("should render", () => {
    const card = {
      id: 1,
      isDragged: false,
      onDragEnd: () => {},
      onDragOver: () => {},
      onDragStart: () => {},
      placeholder: false,
    };
    render(
      <Card {...card}>
        <div>child</div>
      </Card>
    );
    expect(true).toBeTruthy();
  });
});
