import React from 'react';
import MainContent from '../MainContent/MainContent';
import Clients from '../Clients/Clients';
import TravelEase from '../TravelEase/TravelEase';
import Featured from '../Featured/Featured';
import Statinfo from '../Statistic/Statinfo';
import SlideShow from '../SlideShow/SlideShow';
import FAQ from '../FAQ/FAQ';
import Subscription from '../Subscription/Subscription';

function Home() {
    return (
        <main>
            <MainContent />
            <Clients />
            <TravelEase />
            <Featured />
            <Statinfo />
            <SlideShow />
            <FAQ />
            <Subscription />
        </main>
    )
}

export default Home;