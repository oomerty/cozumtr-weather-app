import { useState } from "react";

import { Chip } from "@mui/material";

function WeatherSoundButton({ condition }: { condition: string }) {
  const [audioEnabled, setAudioEnabled] = useState(false);

  function handleAudioPlay() {
    const audio = new Audio("/audio/rain.mp3");
    audio.loop = true;

    console.log(condition);

    if (audioEnabled) audio.pause();
    if (!audioEnabled) audio.play();

    setAudioEnabled(!audioEnabled);
  }

  return (
    <Chip
      label={audioEnabled ? "Turn Off Sound" : "Turn On Sound"}
      onClick={handleAudioPlay}
      clickable
    />
  );
}

export default WeatherSoundButton;
