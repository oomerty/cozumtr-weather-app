import { useEffect } from "react";

import { useTheme } from "../contexts/useTheme";

import { Grid, Paper, Typography } from "@mui/material";

import WeatherDetailCard from "./WeatherDetailCard";

interface WeatherDetailsProps {
  details: object;
}

function WeatherDetails({ details }: WeatherDetailsProps) {
  const { setMode } = useTheme();

  const timeEpoch = Date.parse(details?.location.localtime);
  const time = new Date(timeEpoch);

  const currentTemp = details?.current.temp_c;
  const feelsLikeTemp = details?.current.feelslike_c;

  const forecastArr = details?.forecast.forecastday[0].hour;
  const forecastFromNow = forecastArr?.slice(time.getHours());
  console.log(forecastFromNow);

  useEffect(() => {
    setMode(details?.current.is_day ? "day" : "night");
    if (details?.current.is_day) {
      document.body.style.background =
        "linear-gradient(180deg, #4c90d9 30%, #b0d2f8 90%)";
    } else {
      document.body.style.background =
        "linear-gradient(180deg, #00060f 30%, #10357a 90%)";
    }
  }, [details]);

  return (
    <Paper
      sx={{
        flexDirection: "column",
        height: "100%",
        maxHeight: { sm: "100%", md: "100vh" },
        overflow: "auto",
        p: 4,
        boxSizing: "border-box",
      }}
      elevation={0}
    >
      <Grid container spacing={2}>
        <WeatherDetailCard gridSize={12}>
          <Grid columns={{ sm: 1, md: 5 }} container spacing={1}>
            {forecastFromNow &&
              Object.values(forecastFromNow)
                .slice(0, 5)
                .map((el, index) => {
                  return (
                    <Grid
                      key={index}
                      size={1}
                      textAlign="center"
                      sx={{
                        display: "flex",
                        flexDirection: "column",
                        gap: 0.5,
                      }}
                    >
                      <Typography variant="subtitle2">
                        {index === 0 ? "Now" : el?.time.split(" ").at(1)}
                      </Typography>
                      <Typography variant="h5">{el?.temp_c}°</Typography>
                      <Typography variant="body1">
                        {el?.condition.text}
                      </Typography>
                    </Grid>
                  );
                })}
          </Grid>
        </WeatherDetailCard>

        <Wind
          windSpeed={details?.current.wind_kph}
          windDeg={details?.current.wind_degree}
          windDir={details?.current.wind_dir}
          windGust={details?.current.gust_kph}
        />
        <FeelsLike feelsLikeTemp={feelsLikeTemp} currentTemp={currentTemp} />
        <Humidity
          humidity={details?.current.humidity}
          dewpoint={details?.current.dewpoint_c}
        />
        <UV uv={details?.current.uv} />
        <Precipitation precipitation={details?.current.precip_mm} />
        <Visibility visibility={details?.current.vis_km} />
      </Grid>
    </Paper>
  );
}

function Wind({
  windSpeed,
  windDeg,
  windDir,
  windGust,
}: {
  windSpeed: number;
  windDeg: number;
  windDir: string;
  windGust: number;
}) {
  return (
    <WeatherDetailCard title="Wind">
      <Typography variant="h4">{windSpeed} km/h</Typography>
      <Typography variant="body1">
        Direction {windDeg}° {windDir}
      </Typography>
      <Typography variant="body1">Wind gusts {windGust} km/h</Typography>
    </WeatherDetailCard>
  );
}

function FeelsLike({
  feelsLikeTemp,
  currentTemp,
}: {
  feelsLikeTemp: number;
  currentTemp: number;
}) {
  return (
    <WeatherDetailCard title="Feels Like">
      <Typography variant="h4">{feelsLikeTemp}°</Typography>
      <Typography variant="body1">
        It feels{" "}
        {currentTemp > feelsLikeTemp
          ? "cooler than"
          : currentTemp < feelsLikeTemp
          ? "warmer than"
          : "almost same as"}{" "}
        the actual temperature
      </Typography>
    </WeatherDetailCard>
  );
}

function Humidity({
  humidity,
  dewpoint,
}: {
  humidity: number;
  dewpoint: number;
}) {
  return (
    <WeatherDetailCard title="Humidity">
      <Typography variant="h4">{humidity}%</Typography>
      <Typography variant="body1">
        The dew point is {dewpoint}° right now
      </Typography>
    </WeatherDetailCard>
  );
}

function UV({ uv }: { uv: number }) {
  return (
    <WeatherDetailCard title="UV">
      <Typography variant="h4">{uv}</Typography>
      <Typography variant="body1">
        {uv <= 2
          ? "No protection needed"
          : uv <= 7
          ? "Put on protection and wear protective clothing"
          : "Put on extra protection and don't stay outside much"}
      </Typography>
    </WeatherDetailCard>
  );
}

function Precipitation({ precipitation }: { precipitation: number }) {
  return (
    <WeatherDetailCard title="Precipitation">
      <Typography variant="h4">{precipitation}mm</Typography>
      <Typography variant="body1">
        Rainfall {precipitation > 0 ? "expected" : "not expected"}
      </Typography>
    </WeatherDetailCard>
  );
}

function Visibility({ visibility }: { visibility: number }) {
  return (
    <WeatherDetailCard title="Visibility">
      <Typography variant="h4">{visibility} KM</Typography>
      <Typography variant="body1">
        {visibility < 5 ? "Low visibility, be careful" : "Clear vision"}
      </Typography>
    </WeatherDetailCard>
  );
}

export default WeatherDetails;
