// @vitest-environment jsdom
import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import type { ComponentProps } from "react";
import type { Area } from "react-easy-crop";
import type { ImageCropResult } from "@/pages/sellerDashboard/utils/types";

vi.mock("react-easy-crop", async () => {
  const React = await import("react");

  function MockCropper({
    image,
    aspect,
    onCropChange,
    onCropComplete,
    onInteractionStart,
    onInteractionEnd,
  }: {
    image: string;
    aspect: number;
    onCropChange: (crop: { x: number; y: number }) => void;
    onCropComplete: (area: Area, croppedAreaPixels: Area) => void;
    onInteractionStart?: () => void;
    onInteractionEnd?: () => void;
  }) {
    React.useEffect(() => {
      const area = {
        x: aspect,
        y: image.length,
        width: 100,
        height: 50,
      };

      onCropComplete(area, area);
    }, [aspect, image, onCropComplete]);

    return (
      <div data-testid="mock-cropper">
        <button
          type="button"
          onClick={() => {
            onInteractionStart?.();
            onCropChange({ x: 12, y: 34 });
            onInteractionEnd?.();
          }}
        >
          Simulate Drag
        </button>
      </div>
    );
  }

  return { default: MockCropper };
});

vi.mock("@/pages/sellerDashboard/utils/cropImage", () => ({
  getCroppedImageBlob: vi.fn(
    async (src: string, _cropArea: Area, width: number, height: number) =>
      new Blob([`${src}-${width}x${height}`], { type: "image/jpeg" })
  ),
  getDefaultCrop: vi.fn(),
}));

vi.mock("@/components/ui/customToast", () => ({
  errorToast: vi.fn(),
}));

import ImageCropOverlay from "@/pages/sellerDashboard/sub-components/ImageCropOverlay";
import { getCroppedImageBlob } from "@/pages/sellerDashboard/utils/cropImage";

const existingImage = {
  type: "existing" as const,
  url: "https://cdn.example.com/card.jpg",
};

const detailUrl = "https://cdn.example.com/detail.jpg";

function renderOverlay(
  overrides: Partial<ComponentProps<typeof ImageCropOverlay>> = {}
) {
  const onComplete = vi.fn<(results: ImageCropResult[]) => void>();
  const onCancel = vi.fn();

  render(
    <ImageCropOverlay
      imageItems={[existingImage]}
      detailUrlMap={new Map([[existingImage.url, detailUrl]])}
      onComplete={onComplete}
      onCancel={onCancel}
      {...overrides}
    />
  );

  return { onComplete, onCancel };
}

describe("ImageCropOverlay", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("persists default CARD zoom changes for existing images", async () => {
    const { onComplete } = renderOverlay();

    fireEvent.change(screen.getByRole("slider"), {
      target: { value: "1.5" },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm & submit/i }));

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));

    const results = onComplete.mock.calls[0][0];
    expect(results).toHaveLength(1);
    expect(results[0].type).toBe("existing_card_recrop");
    expect(results[0]).toMatchObject({
      type: "existing_card_recrop",
      detailUrl,
    });
    expect(getCroppedImageBlob).toHaveBeenCalledWith(
      existingImage.url,
      expect.any(Object),
      1280,
      720
    );
  });

  it("persists default CARD drag changes for existing images", async () => {
    const { onComplete } = renderOverlay();

    fireEvent.click(screen.getByRole("button", { name: /simulate drag/i }));
    fireEvent.click(screen.getByRole("button", { name: /confirm & submit/i }));

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));

    expect(onComplete.mock.calls[0][0][0]).toMatchObject({
      type: "existing_card_recrop",
      detailUrl,
    });
    expect(getCroppedImageBlob).toHaveBeenCalledWith(
      existingImage.url,
      expect.any(Object),
      1280,
      720
    );
  });

  it("preserves untouched existing image urls when no crop interaction occurs", async () => {
    const { onComplete } = renderOverlay();

    fireEvent.click(screen.getByRole("button", { name: /confirm & submit/i }));

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));

    expect(onComplete.mock.calls[0][0]).toEqual([
      {
        type: "existing_complete",
        cardUrl: existingImage.url,
        detailUrl,
      },
    ]);
    expect(getCroppedImageBlob).not.toHaveBeenCalled();
  });

  it("recrops only DETAIL when the user interacts with the detail view", async () => {
    const { onComplete } = renderOverlay();

    fireEvent.click(screen.getByRole("button", { name: /detail/i }));
    fireEvent.change(screen.getByRole("slider"), {
      target: { value: "1.75" },
    });
    fireEvent.click(screen.getByRole("button", { name: /confirm & submit/i }));

    await waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));

    const results = onComplete.mock.calls[0][0];
    expect(results).toHaveLength(1);
    expect(results[0].type).toBe("existing_recrop");
    expect(results[0]).toMatchObject({
      type: "existing_recrop",
      cardUrl: existingImage.url,
    });
    expect(getCroppedImageBlob).toHaveBeenCalledWith(
      detailUrl,
      expect.any(Object),
      1260,
      540
    );
  });
});
