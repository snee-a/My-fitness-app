import React, { useEffect } from "react";
import imageMapResize from "image-map-resizer";
import "./MaleTrainer.css";
const MuscleMap = () => {
  useEffect(() => {
    imageMapResize(); // Makes the map responsive
  }, []);
  return (
    <div className="flex justify-center  pt-20 male-trainer-page" >
      <img
        src="/images/male.png" // adjust the path if needed
        useMap="#image-map"
        alt="Muscle Map"
        style={{ maxWidth: "100%", height: "100%" }}
        className="w-[600px] h-auto"
      />
      <map name="image-map">
        <area target="" alt="left-chest" title="left-chest" href="/exercises/left-chest" coords="252,217,266,226,284,240,306,249,322,246,338,235,349,221,351,168,308,164" shape="poly" />
        <area target="" alt="right-chest" title="right-chest" href="/exercises/right-chest" coords="351,216,351,174,368,164,384,164,403,175,422,190,431,202,446,217,422,239,393,252,362,240" shape="poly" />
        <area target="" alt="left-shoulder" title="left-shoulder" href="/exercises/left-shoulder" coords="226,220,256,215,309,163,259,164,237,185" shape="poly" />
        {/* <area target="" alt="right-shoulder" title="right-shoulder" href="/exercises/right-shoulder" coords="283,195,290,189,299,189,305,190,313,190,323,192,331,196,341,203,347,208,350,213,352,219,355,226,355,233,356,244,356,256,356,264,348,259,338,253,329,247,324,237,315,227,306,218,297,208,289,199" shape="poly" />
        <area target="" alt="left-bicep" title="left-bicep" href="/exercises/left-bicep" coords="76,355,71,342,69,326,70,310,73,296,78,284,83,271,93,264,100,258,107,254,114,250,120,255,123,261,126,266,127,279,125,292,121,301,117,310,113,320,106,326,101,336,93,344,85,351,81,354" shape="poly" />
        <area target="" alt="right-bicep" title="right-bicep" href="/exercises/right-bicep" coords="323,249,316,257,313,262,313,270,315,281,317,290,320,301,325,308,326,314,334,327,341,336,349,343,358,348,366,353,369,345,369,334,371,325,370,310,365,295,359,277,345,258" shape="poly" />
       <area target="" alt="left-arm" title="left-arm" href="/exercises/left-arm" coords="5,447,15,452,21,454,26,459,34,454,41,446,45,438,52,430,61,422,67,414,75,402,84,392,86,378,89,367,92,354,92,346,81,351,75,354,70,359,65,366,65,351,61,338,57,326,48,330,41,338,33,350,29,362,24,375,24,385,21,397,19,402,18,411,14,422,10,431,6,437" shape="poly" />
       */}
      </map>
    </div>
  );
};
export default MuscleMap;
