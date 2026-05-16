/* ROUTER + APP SHELL */
const { useState: useStateApp, useEffect: useEffectApp } = React;

function App() {
  const [route, setRoute] = useStateApp("home");
  const [params, setParams] = useStateApp({});

  const go = (newRoute, newParams = {}) => {
    setRoute(newRoute);
    setParams(newParams);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  let page;
  if (route === "home")    page = <PageHome   go={go} />;
  else if (route === "galos")  page = <PageGalos  go={go} />;
  else if (route === "galo")   page = <PageGalo   go={go} params={params} />;
  else if (route === "apoiar") page = <PageApoiar go={go} />;
  else page = <PageHome go={go} />;

  return (
    <>
      <Nav route={route} go={go} />
      {page}
      <Footer go={go} />
    </>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <LangProvider>
    <App />
  </LangProvider>
);
