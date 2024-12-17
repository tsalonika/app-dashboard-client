import React from 'react';
import WordCloud from 'react-d3-cloud';
import { scaleOrdinal } from 'd3-scale';
import { schemeCategory10 } from 'd3-scale-chromatic';

const CloudyWords = ({ wordsData }) => {
    const data = wordsData.map(item => ({
        text: item.keyword,
        value: item.total,
    }));

    const schemeCategory10ScaleOrdinal = scaleOrdinal(schemeCategory10);

    return (
        <WordCloud
            data={data}
            width={500}
            height={400} // Set a fixed height for the WordCloud
            font="Times"
            fontStyle="italic"
            fontWeight="bold"
            fontSize={(word) => Math.log2(word.value) * 2}
            spiral="rectangular"
            rotate={() => 0} // Set rotation to 0 to prevent any rotation
            padding={5}
            random={Math.random}
            fill={(d, i) => schemeCategory10ScaleOrdinal(i)}
            onWordClick={(event, d) => {
                console.log(`onWordClick: ${d.text}`);
            }}
            onWordMouseOver={(event, d) => {
                console.log(`onWordMouseOver: ${d.text}`);
            }}
            onWordMouseOut={(event, d) => {
                console.log(`onWordMouseOut: ${d.text}`);
            }}
        />
    );
}

export default CloudyWords;
