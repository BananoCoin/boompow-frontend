import React from "react";

// FOR SKELETON LOADING. AKA ELEMENTS ARE VISIBLE BEFORE THE CONTENT IS LOADED. SIMILAR TO SITES LIKE FACEBOOK.

// measureText from stackoverflow. I'm sorry! Fast and does what it's supposed to, don't think too much about this code.
// https://stackoverflow.com/a/48172630
const widths = [
  0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
  0, 0, 0, 0, 0, 0, 0.2796875, 0.2765625, 0.3546875, 0.5546875, 0.5546875,
  0.8890625, 0.665625, 0.190625, 0.3328125, 0.3328125, 0.3890625, 0.5828125,
  0.2765625, 0.3328125, 0.2765625, 0.3015625, 0.5546875, 0.5546875, 0.5546875,
  0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.5546875,
  0.2765625, 0.2765625, 0.584375, 0.5828125, 0.584375, 0.5546875, 1.0140625,
  0.665625, 0.665625, 0.721875, 0.721875, 0.665625, 0.609375, 0.7765625,
  0.721875, 0.2765625, 0.5, 0.665625, 0.5546875, 0.8328125, 0.721875, 0.7765625,
  0.665625, 0.7765625, 0.721875, 0.665625, 0.609375, 0.721875, 0.665625,
  0.94375, 0.665625, 0.665625, 0.609375, 0.2765625, 0.3546875, 0.2765625,
  0.4765625, 0.5546875, 0.3328125, 0.5546875, 0.5546875, 0.5, 0.5546875,
  0.5546875, 0.2765625, 0.5546875, 0.5546875, 0.221875, 0.240625, 0.5, 0.221875,
  0.8328125, 0.5546875, 0.5546875, 0.5546875, 0.5546875, 0.3328125, 0.5,
  0.2765625, 0.5546875, 0.5, 0.721875, 0.5, 0.5, 0.5, 0.3546875, 0.259375,
  0.353125, 0.5890625,
];
const avg = 0.5279276315789471;

function measureText(str, fontSize) {
  return (
    Array.from(str).reduce(
      (acc, cur) => acc + (widths[cur.charCodeAt(0)] ?? avg),
      0
    ) * fontSize
  );
}

export const Skeleton = ({ custom, text }) => {
  return (
    <div
      style={{
        width: text ? `${measureText(text.toString(), 16).toFixed()}px` : "",
      }}
      className={`w-20 h-4 bg-light animate-pulse rounded ${
        custom ? custom : ""
      }`}
    ></div>
  );
};
