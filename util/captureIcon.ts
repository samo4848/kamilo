import { Skia } from "@shopify/react-native-skia";
import { captureRef } from "react-native-view-shot";

const captureIcon = async (iconRef: any) => {
  console.log("capturing");

  if (iconRef.current) {
    console.log("current");
    try {
      const uri = await captureRef(iconRef, {
        format: "png",
        quality: 1,
        result: "data-uri",
      });
      console.log("uri", uri);

      const imageBuffer = Buffer.from(uri.split(",")[1], "base64");
      const skData = Skia.Data.fromBytes(new Uint8Array(imageBuffer));
      const skImage = Skia.Image.MakeImageFromEncoded(skData);
      // setImage(skImage);
      return skImage;
    } catch (e) {
      console.log("e", e);
    }
  }
};
export { captureIcon };
