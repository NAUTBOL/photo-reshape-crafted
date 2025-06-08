
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

interface ImageControlsProps {
  quality: number[];
  onQualityChange: (value: number[]) => void;
  width: number;
  height: number;
  onWidthChange: (value: string) => void;
  onHeightChange: (value: string) => void;
  format: string;
  onFormatChange: (value: string) => void;
  onPresetSelect: (preset: string) => void;
  onDownload: () => void;
}

const socialPresets = [
  { name: "Instagram Square", width: 1080, height: 1080 },
  { name: "Instagram Portrait", width: 1080, height: 1350 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "Facebook Post", width: 1200, height: 630 },
  { name: "Twitter Post", width: 1200, height: 675 },
  { name: "WhatsApp", width: 800, height: 800 },
  { name: "LinkedIn Post", width: 1200, height: 627 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
];

const ImageControls = ({
  quality,
  onQualityChange,
  width,
  height,
  onWidthChange,
  onHeightChange,
  format,
  onFormatChange,
  onPresetSelect,
  onDownload,
}: ImageControlsProps) => {
  return (
    <Card className="p-6 space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Compression & Format</h3>
        
        <div className="space-y-3">
          <Label htmlFor="quality">Quality: {quality[0]}%</Label>
          <Slider
            id="quality"
            min={10}
            max={100}
            step={5}
            value={quality}
            onValueChange={onQualityChange}
            className="w-full"
          />
        </div>

        <div className="space-y-3">
          <Label htmlFor="format">Output Format</Label>
          <Select value={format} onValueChange={onFormatChange}>
            <SelectTrigger>
              <SelectValue placeholder="Select format" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="jpeg">JPEG</SelectItem>
              <SelectItem value="png">PNG</SelectItem>
              <SelectItem value="webp">WebP</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Dimensions</h3>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="width">Width (px)</Label>
            <input
              id="width"
              type="number"
              value={width}
              onChange={(e) => onWidthChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="height">Height (px)</Label>
            <input
              id="height"
              type="number"
              value={height}
              onChange={(e) => onHeightChange(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            />
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Social Media Presets</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {socialPresets.map((preset) => (
            <Button
              key={preset.name}
              variant="outline"
              size="sm"
              onClick={() => onPresetSelect(preset.name)}
              className="justify-start text-sm"
            >
              {preset.name}
            </Button>
          ))}
        </div>
      </div>

      <Button onClick={onDownload} className="w-full" size="lg">
        <Download className="h-4 w-4 mr-2" />
        Download Optimized Image
      </Button>
    </Card>
  );
};

export default ImageControls;
