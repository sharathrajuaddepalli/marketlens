import classes from "./layout.module.scss";
import Panel from "../panel/Panel";
import {Route, Routes} from "react-router";
import GrowthPage from "../page/GrowthPage";
import {StaticDataContext, StaticDataProvider} from "../context/StaticDataContext";
import Contribution from "../page/contribution/Contribution";
import NewsInfluencePage from "../page/news/NewsInfluencePage";
import EconInfluencePage from "../page/econinfluece/EconInfluencePage";
import TupleCountsPage from "../page/TupleCounts/TupleCounts";
import SectorVariancePage from "../page/variance/SectorVariancePage";

const PANEL_BODY  = {
    Growth: GrowthPage,
    Contribution: '/contribution',
    "News Influence": '/news-influence',
    Economy: '/economy',
    Distribution: '/distribution'
}

const MainLayout = ({children}) => (
    <div className={classes.layout}>
        <div className={classes.panel}>
            <Panel/>
        </div>
        <div className={classes.displayPage}>
            <StaticDataProvider>
                <Routes>
                    <Route path={"/growth"} element={<GrowthPage/>} />
                    <Route path={"/contribution"} element={<Contribution />} />
                    <Route path={"/news-influence"} element={<NewsInfluencePage />} />
                    <Route path={"/econ-influence"} element={<EconInfluencePage />} />
                    <Route path={"/risk-reward"} element={<SectorVariancePage />} />
                    <Route path={"/tuple-counts"} element={<TupleCountsPage />} />
                    {/*<Route path={"/roi"}>*/}
                    {/*    <ROIPage />*/}
                    {/*</Route>*/}
                </Routes>
            </StaticDataProvider>
        </div>
    </div>
);

export default MainLayout;