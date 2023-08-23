"use client";

import React, { Component } from "react";
import request from "@api/api";
import Hero from "@components/LandingPage/hero/hero";
import Row from "@components/LandingPage/row/row";

export default class landingPage extends Component {
  render() {
    return (
      <div>
        <Hero />
        <Row
          title='POPULAR'
          fetchUrl={request.trending}
          isLargeRow
          trending
          slide
        />
        <Row
          title='Movie'
          fetchUrl={request.popularMovie}
        />
        <Row
          title='Series'
          fetchUrl={request.popularSeries}
        />
        <Row
          title='Romance'
          fetchUrl={request.romance}
        />
      </div>
    );
  }
}
