"use client";

import request from "@api/api";
import Hero from "@components/hero";
import Row from "@components/row";

function LandingPage() {
  return (
    <div className='text-white'>
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

export default LandingPage;
