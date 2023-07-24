import React from "react";
import Coupons from "./Coupons";
import { Box } from "@mui/system";
import Levels from "./Levels";
import { Paper } from "@mui/material";
import { Grid } from "@mui/material";
import { Divider, Typography, Avatar } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import CurrStatus from "./CurrStatus";
import { FaEllipsisH, FaTwitter } from "react-icons/fa";
import { customers } from "../../data/customers";
import { transactions, transactionsColumns } from "../../data/transactions";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/themes/splide-default.min.css';
import eventimage from "../../assets/event.jpg"

const CashKudos = () => {
    const navigate = useNavigate();
    const eventfunction = () => {
        Swal.fire({
            title: "Do you want to register to the event?",
            showDenyButton: true,
            confirmButtonText: "Agree",
            denyButtonText: `Cancel`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                Swal.fire("Registered!", "", "success");
                navigate("/event");
            } else if (result.isDenied) {
                Swal.fire("Changes are not saved", "", "info");
            }
        });
    };
    const ComponentWrapper = styled(Box)({
        marginTop: "10px",
        paddingBottom: "10px",
    });
    const [points, setPoints] = useState(1000);

  const getPoints = async () => {
    var config = {
      method: "get",
      url: "https://backend-r677breg7a-uc.a.run.app/api/accounts/profile/",
      headers: {
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjkwMjQ3NjczLCJpYXQiOjE2ODk5ODg0NzMsImp0aSI6Ijk2YWJkYmQ5ZjZjMTQyYjZiMzEzNDJlZGM0NjFjZGFjIiwidXNlcl9pZCI6MX0.t81v7VQX_Z9aZioT2jMjpYAxBECPKXOSgX2iiVcpi-o",
      },
    };

    axios(config)
      .then(function (response) {
        console.log(response.data.points);
        setPoints(response.data.points);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    getPoints();
  }, []);

  var mylevel = 2;
  return (
    <Box sx={{ pt: "80px", pb: "20px" }}>
      <ComponentWrapper>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CurrStatus points={points} />
            </Paper>
          </Grid>
          <Grid item xs={12} md={4} lg={4}>
            <Paper
              sx={{
                boxShadow: "none !important",
                borderRadius: "12px",
                borderStyle: "solid",
                borderWidth: "1px",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <Paper
                sx={{
                  boxShadow: "none !important",
                  borderRadius: "12px",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  borderColor: "divider",

                  padding: "16px",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography variant="h5" sx={{ pb: 1 }}>
                    Social Media
                  </Typography>
                  <FaEllipsisH />
                </Box>
                <Divider />
                <Box sx={{ marginTop: 1 }}>
                  {customers
                    .slice(0, 4)
                    .map(({ customer_id, customer_name, email, img }) => (
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          margin: "10px 0",
                        }}
                        key={customer_id}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 2,
                          }}
                        >
                          <Avatar src={img} sx={{ width: 30, height: 30 }} />
                          <Box>
                            <Typography variant="h6" sx={{ fontSize: "18px" }}>
                              {customer_name}
                            </Typography>
                            <Typography
                              variant="subtitle1"
                              sx={{ opacity: 0.7 }}
                            >
                                <Typography variant="h5" sx={{ pb: 1 }}>
                                    Social Media
                                </Typography>
                                <FaEllipsisH />
                            </Box>
                            <Divider />
                            <Box sx={{ marginTop: 1 }}>
                                {customers
                                    .slice(0, 4)
                                    .map(({ customer_id, customer_name, email, img }) => (
                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                                margin: "10px 0",
                                            }}
                                            key={customer_id}
                                        >
                                            <Box
                                                sx={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 2,
                                                }}
                                            >
                                                <Avatar src={img} sx={{ width: 30, height: 30 }} />
                                                <Box>
                                                    <Typography variant="h6" sx={{ fontSize: "18px" }}>
                                                        {customer_name}
                                                    </Typography>
                                                    <Typography variant="subtitle1" sx={{ opacity: 0.7 }}>
                                                        {email}
                                                    </Typography>
                                                </Box>
                                            </Box>
                                            <a href="http://twitter.com/share?text=text goes here&url=http://url goes here&hashtags=hashtag1,hashtag2,hashtag3" target="_blank"><FaTwitter /></a>
                                        </Box>
                                    ))}
                            </Box>
                        </Paper>
                    </Paper>
                </Grid>
                <Grid item xs={12} md={4} lg={4}>

                    <Paper
                        sx={{
                            boxShadow: "none !important",
                            borderRadius: "12px",
                            borderStyle: "solid",
                            borderWidth: "1px",
                            borderColor: "divider",
                            height: "100%",
                        }}
                    >
                        <Levels mylevel={mylevel} />
                    </Paper>
                </Grid>
            </Grid>
        </ComponentWrapper>
        <br />
        <br />
        <br />
        <Typography variant="h5">Upcoming Events</Typography>

        <Splide options={{
            rewind: true,
            gap: '1rem',
            perPage: 3,
            perMove: 1,
            autoplay: true, // Enable auto play
            interval: 3000,
        }}
            aria-label="My Favorite Images">
            <button onClick={eventfunction}>
                <SplideSlide>
                    <Paper style={{ cursor: "pointer" }} sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                        <img alt="bajaj" src={eventimage} width={350} height={180}></img>
                    </Paper>
                </SplideSlide>
            </button>
            <button onClick={eventfunction}>
                <SplideSlide>
                    <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                        <img alt="bajaj" src={eventimage} width={350} height={180}></img>
                    </Paper>
                </SplideSlide>
            </button>
            <button onClick={eventfunction}>
                <SplideSlide>
                    <a href="https://www.bajajfinserv.in/rbl-dbs-credit-cards" target="_blank" rel="noreferrer">
                        <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                            <img alt="bajaj" src={eventimage} width={350} height={180}></img>
                        </Paper>
                    </a>
                </SplideSlide>
            </button>
            <SplideSlide>
                <a href="https://www.bajajfinserv.in/emi-network" target="_blank" rel="noreferrer">
                    <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                        <img alt="bajaj" src={eventimage} width={350} height={180}></img>
                    </Paper>
                </a>
            </SplideSlide>
            <SplideSlide>
                <Paper sx={{ boxShadow: "none !important", borderRadius: "12px", borderStyle: "solid", borderWidth: "1px", borderColor: "divider", height: "100%", }}>
                    <img alt="bajaj" src={eventimage} width={350} height={180}></img>
                </Paper>
            </SplideSlide>


        </Splide>
        <br />
        <br />
        <br />
        {/* <Coupons setPoints={setPoints} points={points} /> */}
        <Coupons getPoints={getPoints} />

    </Box >
}

export default CashKudos;
