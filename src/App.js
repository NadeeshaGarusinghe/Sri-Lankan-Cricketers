import React, { useEffect, useState } from "react";
import Cricketer from './cricketer';
import ReactPaginate from "react-paginate";
import Autocomplete from '@mui/material/Autocomplete';
import { TextField, Select, MenuItem, InputLabel } from '@mui/material';
import { Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@mui/material/Button';
import './App.css';
import Datepicker from "react-datepicker";
import {
  FormControl,
} from "@material-ui/core";
import background from "./img/img.jpg";
import { flexbox } from "@mui/system";


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  paper: {
    maxWidth: 1200,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
  paper1: {
    maxWidth: 1200,
    margin: `${theme.spacing(1)}px auto`,
    padding: theme.spacing(2),
    textAlign: 'right',
    color: theme.palette.text.secondary,
  },
  formControl: {
    width: "80%"
  },
}));



const Placeholder = ({ children }) => {
  return <div >{children}</div>;
};
function App() {

  const classes = useStyles();

  const [cricketers, setCricketers] = useState([]);
  const [name, setName] = useState("");
  const [town, setTown] = useState("");
  const [school, setSchool] = useState("");
  const [batting, setBatting] = useState("");
  const [bowling, setBowling] = useState("");
  const [search, setSearch] = useState("");
  const [startdate, setStartdate] = useState("");
  const [pageNumber, setPageNumber] = useState(0);
  const [autoCompleteName, setAutoCompleteName] = useState([]);
  const [autoCompleteTown, setAutoCompleteTown] = useState([]);
  const [autoCompleteSchool, setAutoCompleteSchool] = useState([]);
  const [aggregatedResult, setaggregatedResult] = useState("");
  const [aggregateFeature, setAggregateFeature] = useState("");
  const [focus, setFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);
  const onFocus = () => setFocused(true);
  const onBlur = () => setFocused(false);

  const usersPerPage = 9;
  const pagesVisited = pageNumber * usersPerPage;

  useEffect(() => {
    const y = {
      "wildcard": {
        "සම්පූර්ණ_නම.keyword": "*"
      }
    }
    fetchCricketers(y);
  }, []);


  const fetchCricketers = async (x) => {
    var arr = [];
    const response = await fetch('http://localhost:9200/srilankancricketers/_search?size=300', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        "query": x

      }),
    });
    const data = await response.json();
    console.log(data.hits.hits);


    setCricketers(data.hits.hits);
    data.hits.hits.map(cricketer => {
      arr.push({ "_source": cricketer._source });
    });
    setCricketers(arr);
  }


  //search by any
  const getCricketers = async (event) => {
    if (search.trim() !== "") {
      const x = {
        "multi_match": {
          "query": search,
          "fields": ["සම්පූර්ණ_නම", "වයස", "උපන්_ගම", "පාසල", "ජීවන_දත්ත", "ක්‍රීඩා_ඉරියව්ව", "කණ්ඩායම්", "පන්දු_යවන_ඉරියව්ව", "පිතිකරන_විලාසය", "පුද්ගල_වාර්තා", "වයස", "උපන්දිනය"]
        }
      }
      event.preventDefault();
      fetchCricketers(x);
    }
    else {

      getResult(event);
    }

  }




  const getResult = async (event) => {
    var arr = [];
    event.preventDefault();
    var y = {}
    if (aggregateFeature === "පාසල") {
      y = {
        "පාසල": {
          "terms": {
            "field": "පාසල.keyword"
          }
        }
      }
    }
    else if (aggregateFeature === "උපන්_ගම") {
      y = {
        "උපන්_ගම": {
          "terms": {
            "field": "උපන්_ගම.keyword"
          }
        }
      }
    }

    else if (aggregateFeature === "පන්දු_යවන_ඉරියව්ව") {
      y = {
        "පන්දු_යවන_ඉරියව්ව": {
          "terms": {
            "field": "පන්දු_යවන_ඉරියව්ව.keyword"
          }
        }
      }
    }

    else if (aggregateFeature === "පිතිකරන_විලාසය") {
      y = {
        "පිතිකරන_විලාසය": {
          "terms": {
            "field": "පිතිකරන_විලාසය.keyword"
          }
        }
      }
    }
    const filterCriteria = { "සම්පූර්ණ_නම": name, "පාසල": school, "උපන්_ගම": town, "පිතිකරන_විලාසය": batting, "පන්දු_යවන_ඉරියව්ව": bowling, "උපන්දිනය": startdate }
    var x = []
    Object.keys(filterCriteria).map(criteria => {
      if (filterCriteria[criteria] !== "") {
        if (criteria === "සම්පූර්ණ_නම") {
          x.push({
            "match": {
              "සම්පූර්ණ_නම": {
                "query": name,
                "operator": "and"
              }
            }
          });
        }
        if (criteria === "පාසල") {
          x.push({
            "match": {
              "පාසල": {
                "query": school,
                "operator": "and"
              }
            }
          });
        }
        if (criteria === "උපන්_ගම") {
          x.push({
            "match": {
              "උපන්_ගම": {
                "query": town,
                "operator": "and"
              }
            }
          });
        }

        if (criteria === "පිතිකරන_විලාසය") {
          x.push({
            "term": {
              "පිතිකරන_විලාසය.keyword": {
                "value": batting
              }
            }
          });
        }

        if (criteria === "පන්දු_යවන_ඉරියව්ව") {
          x.push({
            "term": {
              "පන්දු_යවන_ඉරියව්ව.keyword": {
                "value": bowling
              }
            }
          });
        }
        if (criteria === "උපන්දිනය") {
          x.push({
            "range": {
              "උපන්දිනය": {
                "gte": startdate,
                "lte": "2021-11-30"
              }
            }
          });
        }
      }

    });


    const response = await fetch('http://localhost:9200/srilankancricketers/_search?size=300',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "query": {
            "bool": {
              "must": x
            }
          },
          "aggs": y

        }),
      }
    );
    const data = await response.json();
    data.hits.hits.map(cricketer => {
      arr.push({ "_source": cricketer._source });

    });
    setCricketers(arr);

    if (aggregateFeature !== '') {
      if (aggregateFeature === "පාසල") {
        var aggregations = data.aggregations.පාසල.buckets;
      }
      else if (aggregateFeature === "උපන්_ගම") {
        var aggregations = data.aggregations.උපන්_ගම.buckets;
      }
      else if (aggregateFeature === "පිතිකරන_විලාසය") {
        var aggregations = data.aggregations.පිතිකරන_විලාසය.buckets;
      }
      else if (aggregateFeature === "පන්දු_යවන_ඉරියව්ව") {
        var aggregations = data.aggregations.පන්දු_යවන_ඉරියව්ව.buckets;
      }


      var m = '';
      m = m + '<ul>'

      aggregations.map(x => {
        if (x.key === "") {
          x.key = aggregateFeature + " " + "සඳහන් නොමැති"
        }
        m = m + '<li>'
        m = m + x.key + " :- " + x.doc_count
        m = m + '</li>'
      })
      m = m + '</ul>'
      setaggregatedResult(m);

    }

  }


  const autoCorrect = async (query, type) => {

    const response = await fetch('http://localhost:9200/srilankancricketers/_search?size=300',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "query": query


        }),
      }
    );
    const data = await response.json();

    var cricketerList = []
    var uniqueArray = []
    var arr = []

    data.hits.hits.map(cricketer => {
      var dict = {}
      if (!uniqueArray.includes(cricketer._source[type])) {
        uniqueArray.push(cricketer._source[type]);
        dict["label"] = cricketer._source[type]
        arr.push(cricketer._source[type]);
        cricketerList.push(dict);
      }


    });
    if (type === "සම්පූර්ණ_නම") {
      setAutoCompleteName(cricketerList);
    }
    else if (type === "උපන්_ගම") {
      setAutoCompleteTown(cricketerList);

    }
    else if (type === "පාසල") {
      setAutoCompleteSchool(cricketerList);
    }
  }

  const updateName = e => {

    autoCorrect({
      "match_phrase_prefix": {
        "සම්පූර්ණ_නම": {
          "query": e.target.value,
          "slop": 3,
          "max_expansions": 5
        }
      }
    }, "සම්පූර්ණ_නම");


  }

  const updateTown = e => {
    autoCorrect({
      "match_phrase_prefix": {
        "උපන්_ගම": {
          "query": e.target.value,
          "slop": 3,
          "max_expansions": 5
        }
      }
    }, "උපන්_ගම");


  }

  const updateSchool = e => {
    autoCorrect({
      "match_phrase_prefix": {
        "පාසල": {
          "query": e.target.value,
          "slop": 3,
          "max_expansions": 5
        }
      }
    }, "පාසල");
  }

  const updateNewName = (value) => {
    setName(value.label);
  }

  const updateNewTown = (value) => {
    setTown(value.label);
  }
  const updateNewSchool = (value) => {
    setSchool(value.label);
  }


  const updateBatting = e => {
    setBatting(e.target.value)
  }
  const updateBowling = e => {
    setBowling(e.target.value)
  }
  const updateSearch = e => {
    setSearch(e.target.value)
  }
  const updateStartdate = e => {
    console.log(e.target.value)
    setStartdate(e.target.value)
  }

  const updateAggregateFeature = e => {
    setAggregateFeature(e.target.value);
  }


  const pageCount = Math.ceil(cricketers.length / usersPerPage);

  const changePage = ({ selected }) => {
    setPageNumber(selected);
  }

  const styleObj = {
    color: 'black',
    backgroundColor: 'white',
    width: 350,

  };

  return (
    <div className="App">
      <div style={{
        backgroundImage: `url(${background})`

      }}>

        <form onSubmit={getCricketers} className="search-form">
          <input className="search-bar" type="text" value={search} onChange={updateSearch} placeholder="විස්තරය" />

        </form>

        <Grid className={classes.paper1} container direction={'raw'} spacing={1}>
          <Grid xs={3}>
            <Autocomplete
              onChange={(event, value) => updateNewName(value)}
              disablePortal
              id="combo-box-demo"
              options={autoCompleteName}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField value={name} onChange={updateName} style={{
                backgroundColor: "white"
              }} {...params} label="නම" />}
            />
          </Grid>

          <Grid item xs={3}>
            <Autocomplete
              onChange={(event, value) => updateNewTown(value)}
              disablePortal
              id="combo-box-demo"
              options={autoCompleteTown}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField value={town} onChange={updateTown} style={{
                backgroundColor: "white"
              }} {...params} label="උපන් ගම" />}
            />
          </Grid>

          <Grid xs={3}>
            <Autocomplete
              onChange={(event, value) => updateNewSchool(value)}
              disablePortal
              id="combo-box-demo"
              options={autoCompleteSchool}
              sx={{ width: 250 }}
              renderInput={(params) => <TextField value={school} onChange={updateSchool} style={{
                backgroundColor: "white"
              }} {...params} label="පාසල" />}
            />
          </Grid>
          <Grid xs={3}>
            <TextField
              onFocus={onFocus}
              onBlur={onBlur}
              value={startdate}
              onChange={updateStartdate}

              style={{
                backgroundColor: "white"
              }}
              label="උපන් කාල වකවානුව"
              type={hasValue || focus ? "date" : "text"}

            />
          </Grid>

          <Grid xs={4} >
            <FormControl required className={classes.formControl}>
              <Select value={batting} onChange={updateBatting} displayEmpty style={{
                backgroundColor: "white"
              }} renderValue={
                batting !== "" ? undefined : () => <Placeholder >පිතිකරන විලාසය</Placeholder>
              }  >

                <MenuItem value="දකුණත් පිතිකරු">දකුණත් පිතිකරු</MenuItem>
                <MenuItem value="වමත් පිතිකරු">වමත් පිතිකරු</MenuItem>
              </Select>
            </FormControl>
          </Grid>

          <Grid xs={4}>
            <FormControl required className={classes.formControl}>
              <Select value={bowling} onChange={updateBowling} displayEmpty style={{
                backgroundColor: "white"
              }} renderValue={
                bowling !== "" ? undefined : () => <Placeholder>පන්දු යවන ඉරියව්ව</Placeholder>
              } >
                <MenuItem value="Slow left arm orthodox">Slow left arm orthodox</MenuItem>
                <MenuItem value="Right arm fast medium">Right arm fast medium</MenuItem>
                <MenuItem value="Legbreak">Legbreak</MenuItem>
                <MenuItem value="Right arm medium">Right arm medium</MenuItem>
                <MenuItem value="Right arm medium fast">Right arm medium fast</MenuItem>
                <MenuItem value="Left arm medium fast">Left arm medium fast</MenuItem>
                <MenuItem value="Legbreak googly">Legbreak googly</MenuItem>
                <MenuItem value="Right arm offbreak">Right arm offbreak</MenuItem>
              </Select>
            </FormControl>
          </Grid>




          <Grid xs={4}>
            <FormControl required className={classes.formControl}>
              <Select value={aggregateFeature} onChange={updateAggregateFeature} style={{
                backgroundColor: "white"
              }} displayEmpty renderValue={
                aggregateFeature !== "" ? undefined : () => <Placeholder>සමූහගත කිරීම</Placeholder>
              } >
                <MenuItem value="පාසල">පාසල</MenuItem>
                <MenuItem value="උපන්_ගම">උපන් ගම</MenuItem>
                <MenuItem value="පිතිකරන_විලාසය">පිතිකරන විලාසය</MenuItem>
                <MenuItem value="පන්දු_යවන_ඉරියව්ව">පන්දු යවන ඉරියව්ව</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={12} >
            <Box pt={1}>
              <Button variant="contained" onClick={getCricketers}>සොයන්න</Button>
            </Box>
          </Grid>
        </Grid>









        <div className="content" dangerouslySetInnerHTML={{ __html: aggregatedResult }} style={styleObj}></div>




        <div className="cricketers">
          {cricketers.slice(pagesVisited, pagesVisited + usersPerPage).map(cricketer => (
            < Cricketer
              key={cricketer._source.සම්පූර්ණ_නම}
              full_name={cricketer._source.සම්පූර්ණ_නම}
              image={cricketer._source.ඡායා_රූප}
              birth={cricketer._source.උපන්දිනය}
              town={cricketer._source.උපන්_ගම}
              age={cricketer._source.වයස}
              school={cricketer._source.පාසල}
              batting_style={cricketer._source.පිතිකරන_විලාසය}
              bawling_style={cricketer._source.පන්දු_යවන_ඉරියව්ව}

            />
          ))}


          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"paginationBttns"}
            previousLinkClassName={"previousBttn"}
            nextLinkClassName={"nextBttn"}
            disabledClassName={"paginationDisabled"}
            activeClassName={"paginationActive"}
          />
        </div>

      </div>
    </div>
  );
}

export default App;
