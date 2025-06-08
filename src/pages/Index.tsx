
import { useState, useRef, useCallback } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ImageUpload from "@/components/ImageUpload";
import ImageControls from "@/components/ImageControls";
import { Card } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";

const socialPresets = {
  "Instagram Square": { width: 1080, height: 1080 },
  "Instagram Portrait": { width: 1080, height: 1350 },
  "Instagram Story": { width: 1080, height: 1920 },
  "Facebook Post": { width: 1200, height: 630 },
  "Twitter Post": { width: 1200, height: 675 },
  "WhatsApp": { width: 800, height: 800 },
  "LinkedIn Post": { width: 1200, height: 627 },
  "YouTube Thumbnail": { width: 1280, height: 720 },
};

const Index = () => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [originalFile, setOriginalFile] = useState<File | null>(null);
  const [quality, setQuality] = useState([80]);
  const [width, setWidth] = useState(800);
  const [height, setHeight] = useState(600);
  const [format, setFormat] = useState("jpeg");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { toast } = useToast();

  const handleImageUpload = useCallback((file: File) => {
    setOriginalFile(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        setWidth(img.width);
        setHeight(img.height);
      };
      img.src = e.target?.result as string;
      setUploadedImage(e.target?.result as string);
    };
    reader.readAsDataURL(file);

    toast({
      title: "Image uploaded successfully!",
      description: "You can now adjust the settings and download your optimized image.",
    });
  }, [toast]);

  const handleRemoveImage = useCallback(() => {
    setUploadedImage(null);
    setOriginalFile(null);
    setWidth(800);
    setHeight(600);
  }, []);

  const handlePresetSelect = useCallback((presetName: string) => {
    const preset = socialPresets[presetName as keyof typeof socialPresets];
    if (preset) {
      setWidth(preset.width);
      setHeight(preset.height);
      toast({
        title: `Applied ${presetName} preset`,
        description: `Dimensions set to ${preset.width}x${preset.height}px`,
      });
    }
  }, [toast]);

  const handleDownload = useCallback(() => {
    if (!uploadedImage || !originalFile) {
      toast({
        title: "No image to download",
        description: "Please upload an image first.",
        variant: "destructive",
      });
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.onload = () => {
      canvas.width = width;
      canvas.height = height;

      // Clear canvas
      ctx.clearRect(0, 0, width, height);

      // Calculate aspect ratios
      const imgAspect = img.width / img.height;
      const canvasAspect = width / height;

      let drawWidth, drawHeight, offsetX, offsetY;

      if (imgAspect > canvasAspect) {
        // Image is wider than canvas ratio
        drawHeight = height;
        drawWidth = height * imgAspect;
        offsetX = (width - drawWidth) / 2;
        offsetY = 0;
      } else {
        // Image is taller than canvas ratio
        drawWidth = width;
        drawHeight = width / imgAspect;
        offsetX = 0;
        offsetY = (height - drawHeight) / 2;
      }

      // Draw image (this will crop it to fit)
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);

      // Convert to blob and download
      canvas.toBlob((blob) => {
        if (blob) {
          const url = URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = `optimized-image.${format}`;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
          URL.revokeObjectURL(url);

          toast({
            title: "Download started!",
            description: "Your optimized image is being downloaded.",
          });
        }
      }, `image/${format}`, quality[0] / 100);
    };

    img.src = uploadedImage;
  }, [uploadedImage, originalFile, width, height, format, quality, toast]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container max-w-screen-xl mx-auto px-4 py-8">
        <div className="space-y-8">
          {/* Hero Section */}
          <div className="text-center space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Image Compressor
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Compress and resize your images for social media, WhatsApp, and web use. 
              Fast, free, and privacy-focused - all processing happens in your browser.
            </p>
          </div>

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Upload Section */}
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold mb-4">Upload Your Image</h2>
                <ImageUpload
                  onImageUpload={handleImageUpload}
                  uploadedImage={uploadedImage}
                  onRemoveImage={handleRemoveImage}
                />
              </div>

              {/* Preview */}
              {uploadedImage && (
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">Preview ({width}x{height}px)</h3>
                  <div className="relative bg-muted rounded-lg p-4 flex items-center justify-center min-h-[200px]">
                    <img
                      src={uploadedImage}
                      alt="Preview"
                      className="max-w-full max-h-64 object-contain rounded"
                    />
                  </div>
                </Card>
              )}
            </div>

            {/* Controls Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-semibold">Optimization Settings</h2>
              
              {uploadedImage ? (
                <ImageControls
                  quality={quality}
                  onQualityChange={setQuality}
                  width={width}
                  height={height}
                  onWidthChange={(value) => setWidth(parseInt(value) || 0)}
                  onHeightChange={(value) => setHeight(parseInt(value) || 0)}
                  format={format}
                  onFormatChange={setFormat}
                  onPresetSelect={handlePresetSelect}
                  onDownload={handleDownload}
                />
              ) : (
                <Card className="p-8 text-center">
                  <div className="text-muted-foreground">
                    <p className="text-lg mb-2">Upload an image to get started</p>
                    <p className="text-sm">
                      Once you upload an image, you'll be able to adjust compression, 
                      resize dimensions, and choose output formats.
                    </p>
                  </div>
                </Card>
              )}
            </div>
          </div>

          {/* Features Section */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Privacy First</h3>
              <p className="text-sm text-muted-foreground">
                All processing happens in your browser. Your images never leave your device.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Social Media Ready</h3>
              <p className="text-sm text-muted-foreground">
                Pre-configured presets for Instagram, Facebook, Twitter, and more.
              </p>
            </Card>
            
            <Card className="p-6 text-center">
              <h3 className="text-lg font-semibold mb-2">Multiple Formats</h3>
              <p className="text-sm text-muted-foreground">
                Export as JPEG, PNG, or modern WebP format with custom quality settings.
              </p>
            </Card>
          </div>
        </div>
      </main>

      {/* Hidden canvas for image processing */}
      <canvas ref={canvasRef} className="hidden" />
      
      <Footer />
    </div>
  );
};

export default Index;
