import React from "react";
import { CloudRain, Cloud, Snowflake, CloudFog, Sun } from "phosphor-react";

interface Props {
  weather: "Rain" | "Clouds" | "Snow" | "Mist" | "Clear" | string;
  iconSize: number;
}

const Icons = ({ weather, iconSize }: Props) => {
  const icon = () => {
    switch (weather) {
      case "Rain":
        return <CloudRain size={iconSize} weight="bold" />;
      case "Clouds":
        return <Cloud size={iconSize} weight="bold" />;
      case "Snow":
        return <Snowflake size={iconSize} weight="bold" />;
      case "Mist":
        return <CloudFog size={iconSize} weight="bold" />;
      case "Clear":
        return <Sun size={iconSize} weight="bold" />;
      default:
        return null;
    }
  };

  return <div>{icon()}</div>;
};

export default Icons;
