import React, { useEffect, useMemo, useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import CountryCard from "./CountryCard";
import { useStore } from "../store";

const CountrySearch = () => {
  const [data, setData] = useState([
    {
      name: { common: "" },
      flags: { png: "" },
      capital: [""],
      population: 0,
      region: "",
    },
  ]);

  const [region, setRegion] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [filteredCountries, setFilteredCountries] = useState(data);

  const [isLoading, setIsLoading] = useState(true);

  const isDarkMode = useStore((state) => state.isDarkMode);

  const handleChange = (event: SelectChangeEvent) => {
    setRegion(event.target.value);
  };

  const handleTyping = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setSearchValue(e.target.value);
  };

  useMemo(() => {
    let countries = [];

    if (region !== "") {
      countries = data.filter((country) => country.region === region);

      if (searchValue !== "") {
        setFilteredCountries(
          countries.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(countries);
      }
    } else if (region === "") {
      if (searchValue !== "") {
        setFilteredCountries(
          data.filter((country) =>
            country.name.common
              .toLowerCase()
              .includes(searchValue.toLowerCase())
          )
        );
      } else {
        setFilteredCountries(data);
      }

      data;
    }
  }, [data, region, searchValue]);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,capital,region,population"
    )
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setFilteredCountries(data);
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Box sx={{ padding: "2rem" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "2rem",
        }}
      >
        <TextField
          id="outlined-basic"
          label="Search for a country"
          variant="outlined"
          sx={{
            width: "35vw",
            backgrundColor: isDarkMode ? "#2b3743" : "#ffffff",
          }}
          onChange={(e) => handleTyping(e)}
        />
        <FormControl
          sx={{
            width: "20vw",
            backgrundColor: isDarkMode ? "#2b3743" : "#ffffff",
          }}
        >
          <InputLabel id="demo-simple-select-label">
            Filter by Region
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={region}
            label="Filter by region"
            onChange={handleChange}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Africa">Africa</MenuItem>
            <MenuItem value="Americas">Americas</MenuItem>
            <MenuItem value="Asia">Asia</MenuItem>
            <MenuItem value="Europe">Europe</MenuItem>
            <MenuItem value="Oceania">Oceania</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}
      >
        {filteredCountries.map((country) => (
          <CountryCard
            key={country.name.common}
            name={country.name.common}
            population={country.population}
            region={country.region}
            capital={country.capital[0]}
            flag={country.flags.png}
          />
        ))}
      </Box>
    </Box>
  );
};

export default CountrySearch;
