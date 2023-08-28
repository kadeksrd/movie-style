"use client";

import React, { Component } from "react";
import request from "@api/api";
import Hero from "@components/LandingPage/hero/hero";
import Row from "@components/LandingPage/row/row";

export default class landingPage extends Component {
  render() {
    return (
      <div className='bg-black'>
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
          title='Action'
          fetchUrl={request.action}
        />
        <Row
          title='Documentaries'
          fetchUrl={request.documentaries}
        />
        <Row
          title='Comedy'
          fetchUrl={request.comedy}
        />
        <Row
          title='Horor'
          fetchUrl={request.horror}
        />
      </div>
    );
  }
}
