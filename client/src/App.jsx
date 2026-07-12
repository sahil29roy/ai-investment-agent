import React, { useState } from 'react'
import { Box, Container, Flex, Text, SimpleGrid, Theme, Separator, Spinner } from '@chakra-ui/react'
import { Provider } from './components/ui/provider'
import { SearchBar } from './components/SearchBar'
import { CompanyProfile } from './components/CompanyProfile'
import { RecommendationCard } from './components/RecommendationCard'
import { FinancialSummary } from './components/FinancialSummary'
import { NewsSection } from './components/NewsSection'

const TICKER_DATA = {
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    consensus: "Strong Buy",
    score: 8.4,
    status: "INVEST",
    summary: "Solid cash flow generation, strong services growth, and stable margins justify an INVEST action. Despite macro headwinds, product demand remains robust, and valuation is attractive relative to historical averages.",
    analystsCount: 42,
    targetPrice: "$210.00",
    upside: "+15.0%",
    metrics: [
      { label: "Share Price", value: "$178.20", change: "+1.2%" },
      { label: "Market Cap", value: "$2.89T" },
      { label: "P/E Ratio", value: "28.4" },
      { label: "Dividend Yield", value: "0.52%" },
      { label: "Volume (Avg)", value: "52.4M" },
      { label: "52W High", value: "$198.11" },
      { label: "52W Low", value: "$164.08" },
      { label: "Beta (Volatility)", value: "1.24" }
    ],
    company: {
      ticker: "AAPL",
      name: "Apple Inc.",
      sector: "Technology",
      industry: "Consumer Electronics",
      description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. In addition, the company offers various services, including Apple Music, Apple Pay, and iCloud. Apple is known for its focus on premium user experiences, hardware-software integration, and customer-first design ethos.",
      founded: "1976",
      ceo: "Tim Cook",
      employees: "164,000"
    },
    news: [
      {
        title: "Apple introduces new AI-focused chips with improved power efficiency",
        source: "TechDaily",
        date: "2 hours ago",
        sentiment: "Positive",
        summary: "The company announced its latest generation of silicon during a hardware event, focusing heavily on local model execution capabilities and advanced thermal designs."
      },
      {
        title: "Antitrust scrutiny intensifies over app store payment guidelines",
        source: "Finance Wire",
        date: "1 day ago",
        sentiment: "Negative",
        summary: "Regulatory boards in the EU are investigating compliance regarding payment gateways and commissions, possibly impacting services margins."
      },
      {
        title: "Global supply chains stabilize as shipping backlog eases",
        source: "MarketWatch",
        date: "3 days ago",
        sentiment: "Neutral",
        summary: "Retailers and device manufacturers report steady logistics flow heading into the next fiscal quarter."
      }
    ]
  },
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corporation",
    consensus: "Strong Buy",
    score: 9.6,
    status: "INVEST",
    summary: "Unparalleled dominance in AI computing, accelerating data center revenue, and gross margins exceeding 75% support an INVEST stance. NVDA remains the premier hardware choice for generative AI infrastructure.",
    analystsCount: 56,
    targetPrice: "$140.00",
    upside: "+28.4%",
    metrics: [
      { label: "Share Price", value: "$128.20", change: "+4.82%" },
      { label: "Market Cap", value: "$3.15T" },
      { label: "P/E Ratio", value: "68.20" },
      { label: "Dividend Yield", value: "0.03%" },
      { label: "Volume (Avg)", value: "248.1M" },
      { label: "52W High", value: "$140.76" },
      { label: "52W Low", value: "$45.01" },
      { label: "Beta (Volatility)", value: "1.85", change: "+0.08" }
    ],
    company: {
      ticker: "NVDA",
      name: "NVIDIA Corp.",
      sector: "Technology",
      industry: "Semiconductors",
      description: "NVIDIA Corporation focuses on personal computer graphics, graphics processing units, and also on artificial intelligence solutions. It operates through two segments: Graphics and Compute & Networking. The company's products are widely used in gaming, professional visualization, data centers, and automotive markets.",
      founded: "1993",
      ceo: "Jensen Huang",
      employees: "29,600"
    },
    news: [
      {
        title: "NVIDIA announces next-generation Blackwell platform with enhanced AI capabilities",
        source: "AI Insights",
        date: "5 hours ago",
        sentiment: "Positive",
        summary: "The brand new Blackwell architecture enables organizations to build and run real-time generative AI on trillion-parameter large language models at up to 25x less cost."
      },
      {
        title: "Supply issues persist for high-bandwidth memory chips",
        source: "Silicon Insider",
        date: "2 days ago",
        sentiment: "Negative",
        summary: "Delays in memory chip shipments from partners could potentially slow down production pipelines for the high-end H200 and Blackwell cards."
      }
    ]
  },
  TSLA: {
    ticker: "TSLA",
    name: "Tesla Inc.",
    consensus: "Underperform",
    score: 4.2,
    status: "PASS",
    summary: "Declining delivery volumes, price-cut pressures leading to margin compression, and intensifying global EV competition justify a PASS action. Wait for stabilization of auto margins and progress in autonomous driving projects.",
    analystsCount: 38,
    targetPrice: "$165.00",
    upside: "-12.5%",
    metrics: [
      { label: "Share Price", value: "$175.40", change: "-2.1%" },
      { label: "Market Cap", value: "$552.1B" },
      { label: "P/E Ratio", value: "45.8" },
      { label: "Dividend Yield", value: "0.00%" },
      { label: "Volume (Avg)", value: "88.2M" },
      { label: "52W High", value: "$271.00" },
      { label: "52W Low", value: "$138.80" },
      { label: "Beta (Volatility)", value: "2.10" }
    ],
    company: {
      ticker: "TSLA",
      name: "Tesla Inc.",
      sector: "Automotive",
      industry: "Electric Vehicles",
      description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems in the United States, China, and internationally. The company operates in two segments: Automotive and Energy Generation & Storage.",
      founded: "2003",
      ceo: "Elon Musk",
      employees: "140,400"
    },
    news: [
      {
        title: "Delivery volumes decline year-over-year amidst global EV slowdown",
        source: "AutoNews",
        date: "1 day ago",
        sentiment: "Negative",
        summary: "Tesla reported a drop in deliveries for the first quarter, missing most street consensus forecasts due to shipping bottlenecks and lower demand."
      },
      {
        title: "Tesla pushes for Full Self-Driving rollout in China",
        source: "TechNode",
        date: "3 days ago",
        sentiment: "Positive",
        summary: "Reports indicate Tesla is seeking regulatory approvals and partner mapping to roll out its FSD package in the Chinese market this year."
      }
    ]
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corporation",
    consensus: "Buy",
    score: 8.9,
    status: "INVEST",
    summary: "Azure Cloud expansion driven by early monetization of GitHub Copilot and Office AI subscriptions justifies an INVEST action. Free cash flow is robust, and capital returns remain steady.",
    analystsCount: 48,
    targetPrice: "$465.00",
    upside: "+10.2%",
    metrics: [
      { label: "Share Price", value: "$415.60", change: "+0.85%" },
      { label: "Market Cap", value: "$3.09T" },
      { label: "P/E Ratio", value: "35.2" },
      { label: "Dividend Yield", value: "0.72%" },
      { label: "Volume (Avg)", value: "22.8M" },
      { label: "52W High", value: "$430.00" },
      { label: "52W Low", value: "$315.00" },
      { label: "Beta (Volatility)", value: "0.89" }
    ],
    company: {
      ticker: "MSFT",
      name: "Microsoft Corp.",
      sector: "Technology",
      industry: "Systems Software",
      description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide. The company's Productivity and Business Processes segment includes Office, Exchange, SharePoint, Microsoft Teams, Microsoft 365 Security and Compliance, and Skype.",
      founded: "1975",
      ceo: "Satya Nadella",
      employees: "221,000"
    },
    news: [
      {
        title: "Microsoft launches new Copilot+ PCs with advanced local neural processing",
        source: "Windows Blog",
        date: "4 hours ago",
        sentiment: "Positive",
        summary: "The company showcased a new class of Windows laptops built for local AI processing, offering over 40 TOPs performance and long battery life."
      },
      {
        title: "Security overhaul remains top priority following cloud breach investigation",
        source: "CyberDefense",
        date: "4 days ago",
        sentiment: "Neutral",
        summary: "CEO Satya Nadella directed engineers to prioritize security architecture improvements and compliance above introducing new feature milestones."
      }
    ]
  }
}

const mapBackendResponse = (resData) => {
  const profile = resData.profile || {};
  const symbol = resData.symbol || 'ASSET';
  const companyName = resData.companyName || profile.companyName || symbol;
  const analysis = resData.analysis || {};
  const quote = resData.stock?.quote || {};

  // Formats metrics
  const mcap = profile.marketCap ? `$${(profile.marketCap / 1e12).toFixed(2)}T` : 'N/A';
  const price = quote.price ? `$${quote.price.toFixed(2)}` : (profile.price ? `$${profile.price.toFixed(2)}` : 'N/A');
  const pe = quote.pe ? quote.pe.toFixed(1) : (profile.pe ? profile.pe.toFixed(1) : 'N/A');
  const divYield = profile.lastDividend ? `${(profile.lastDividend).toFixed(2)}%` : '0.00%';
  const volAvg = profile.volAvg ? `${(profile.volAvg / 1e6).toFixed(1)}M` : 'N/A';
  
  const metrics = [
    { label: "Share Price", value: price, change: quote.change ? `${quote.change >= 0 ? '+' : ''}${quote.change.toFixed(2)}` : '' },
    { label: "Market Cap", value: mcap },
    { label: "P/E Ratio", value: pe },
    { label: "Dividend Yield", value: divYield },
    { label: "Volume (Avg)", value: volAvg },
    { label: "52W High/Low", value: profile.range || 'N/A' },
    { label: "Beta (Volatility)", value: profile.beta ? profile.beta.toFixed(2) : '1.00' }
  ];

  // Formats news
  const rawNews = resData.filteredNews?.filteredNews || resData.news || [];
  const news = rawNews.slice(0, 3).map((n) => ({
    title: n.title || 'Market Update',
    source: n.site || n.source || 'Market Intelligence',
    date: n.publishedDate ? new Date(n.publishedDate).toLocaleDateString() : 'Recent',
    sentiment: n.sentiment || 'Neutral',
    summary: n.summary || n.text || 'No summary available.'
  }));

  // Formats recommendation
  const status = (analysis.recommendation || 'Hold').toUpperCase();
  const consensus = status === 'INVEST' ? 'Strong Buy' : (status === 'HOLD' ? 'Hold' : 'Underperform');

  return {
    ticker: symbol,
    name: companyName,
    consensus,
    score: analysis.confidence ? (analysis.confidence / 10).toFixed(1) : '7.0',
    status,
    summary: analysis.companySummary || 'No summary available.',
    targetPrice: `${analysis.confidence || 70}%`,
    upside: 'Confidence rating',
    company: {
      ticker: symbol,
      name: companyName,
      sector: profile.sector || 'N/A',
      industry: profile.industry || 'N/A',
      description: profile.description || 'No description available.',
      founded: profile.ipoDate ? profile.ipoDate.substring(0, 4) : 'N/A',
      ceo: profile.ceo || 'N/A',
      employees: profile.fullTimeEmployees ? parseInt(profile.fullTimeEmployees).toLocaleString() : 'N/A'
    },
    news,
    metrics
  };
};

function MainDashboard() {
  const [searchVal, setSearchVal] = useState('')
  const [activeTicker, setActiveTicker] = useState('AAPL')
  const [dynamicData, setDynamicData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Use dynamic data if available and matches the active ticker; otherwise use static TICKER_DATA
  const isDynamicActive = dynamicData && dynamicData.ticker === activeTicker
  const currentData = isDynamicActive 
    ? dynamicData 
    : (TICKER_DATA[activeTicker.toUpperCase()] || TICKER_DATA.AAPL)

  const handleSearchSubmit = async (value) => {
    const cleanVal = value.trim()
    if (!cleanVal) return

    // If it's a whitelisted key, we can load static instantly (or fetch it)
    const upperVal = cleanVal.toUpperCase()
    if (TICKER_DATA[upperVal]) {
      setDynamicData(null)
      setActiveTicker(upperVal)
      setError(null)
      return
    }

    // Run dynamic API search
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('http://localhost:5000/api/investment/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ company: cleanVal })
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.message || `Request failed with status code ${response.status}`)
      }

      const resJson = await response.json()
      if (!resJson.success) {
        throw new Error(resJson.message || 'Investment analysis failed')
      }

      const mappedData = mapBackendResponse(resJson.data)
      setDynamicData(mappedData)
      setActiveTicker(mappedData.ticker)
    } catch (err) {
      console.error(err)
      setError(err.message || 'Failed to retrieve research data.')
    } finally {
      setLoading(false)
    }
  }

  const handleQuickSelect = (ticker) => {
    setDynamicData(null)
    setActiveTicker(ticker)
    setSearchVal(ticker)
    setError(null)
  }

  return (
    <Box minHeight="100vh" bg="bg" color="text.primary" py="10" px="6">
      <Container maxW="1100px" px="0">
        
        {/* Editorial Header */}
        <Flex justify="space-between" align="baseline" pb="2" mb="4">
          <Box>
            <Text fontSize="30px" fontWeight="bold" fontFamily="heading" color="text.primary" letterSpacing="-0.02em">
              The Investment Research Dispatch
            </Text>
            <Text fontSize="12px" color="text.muted" fontFamily="body" mt="0.5" fontStyle="italic">
              Weekly Analyst Review & Asset Evaluation Services • Vol. XII No. 24
            </Text>
          </Box>
          <Box textAlign="right" display={{ base: "none", md: "block" }}>
            <Text fontSize="12px" fontWeight="bold" fontFamily="body" color="text.primary" letterSpacing="0.05em">
              LONDON // NEW YORK // TOKYO
            </Text>
            <Text fontSize="11px" color="text.muted" fontFamily="body">
              Published July 2026
            </Text>
          </Box>
        </Flex>

        <Separator borderColor="border" borderWidth="1px" mb="6" />

        {/* Search & Quick Tickers */}
        <Flex direction="column" gap="4" mb="8">
          <SearchBar 
            value={searchVal} 
            onChange={setSearchVal} 
            onSubmit={handleSearchSubmit} 
          />
          <Flex gap="3" wrap="wrap" align="center">
            <Text fontSize="12px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.05em">
              Select Dispatch:
            </Text>
            {Object.keys(TICKER_DATA).map((ticker) => (
              <Box
                key={ticker}
                as="button"
                onClick={() => handleQuickSelect(ticker)}
                borderBottom="1px solid"
                borderColor={activeTicker === ticker ? "border" : "transparent"}
                color="text.primary"
                fontFamily="body"
                fontSize="13px"
                fontWeight={activeTicker === ticker ? "bold" : "medium"}
                px="1"
                py="0.5"
                cursor="pointer"
                transition="all 0.15s ease"
                _hover={{ borderColor: "border" }}
              >
                {ticker} - {TICKER_DATA[ticker].name}
              </Box>
            ))}
          </Flex>
        </Flex>

        <Separator borderColor="border" borderWidth="1px" mb="8" />

        {/* Loader or Error or Dashboard View */}
        {loading ? (
          <Flex direction="column" align="center" justify="center" py="20" gap="4">
            <Spinner size="lg" color="text.primary" borderWidth="2px" />
            <Text fontFamily="heading" fontSize="18px" fontStyle="italic" color="text.primary">
              Compiling research dispatch and executing asset analysis...
            </Text>
            <Text fontFamily="body" fontSize="12px" color="text.muted">
              Resolving ticker parameters against Financial Modeling Prep stable API
            </Text>
          </Flex>
        ) : error ? (
          <Box border="1px solid" borderColor="negative" p="6" my="10">
            <Text fontFamily="heading" fontSize="20px" fontWeight="bold" color="negative" mb="2">
              Dispatch Compilation Failed
            </Text>
            <Text fontFamily="body" fontSize="14px" color="text.primary" mb="4">
              {error}
            </Text>
            <Box
              as="button"
              onClick={() => handleSearchSubmit(searchVal)}
              border="1px solid"
              borderColor="border"
              px="4"
              py="2"
              fontFamily="body"
              fontSize="12px"
              fontWeight="bold"
              cursor="pointer"
              _hover={{ bg: "border", color: "bg" }}
            >
              Retry Dispatch Compile
            </Box>
          </Box>
        ) : (
          /* Two-Column Editorial Layout */
          <SimpleGrid columns={{ base: 1, lg: 3 }} gap="10">
            {/* Left/Middle Column (span 2): Company Profile & News Dispatches */}
            <Flex gridColumn={{ lg: "span 2" }} direction="column" gap="8">
              <CompanyProfile company={currentData.company} />
              <Separator borderColor="border" borderWidth="1px" />
              <NewsSection news={currentData.news} />
            </Flex>

            {/* Right Column: Financial Parameters list & Verdict */}
            <Flex direction="column" gap="8">
              <Box>
                <Text fontSize="16px" fontWeight="bold" fontFamily="body" color="text.primary" textTransform="uppercase" letterSpacing="0.08em" mb="3">
                  Financial Parameters
                </Text>
                <Separator borderColor="border" borderWidth="1px" mb="3" />
                <FinancialSummary metrics={currentData.metrics} />
              </Box>

              <RecommendationCard recommendation={currentData} />
            </Flex>
          </SimpleGrid>
        )}

        {/* Footer Disclaimer */}
        <Box mt="12" pt="6" borderTop="1px solid" borderColor="border">
          <Text fontSize="11px" color="text.muted" fontFamily="body" lineHeight="1.5" textAlign="center" fontStyle="italic">
            This research dispatch is designed for educational evaluation. Decisions are made solely on analyst interpretations and mock models. All content is subject to copyright.
          </Text>
        </Box>

      </Container>
    </Box>
  )
}

function App() {
  return (
    <Provider>
      <Theme appearance="light">
        <MainDashboard />
      </Theme>
    </Provider>
  )
}

export default App
