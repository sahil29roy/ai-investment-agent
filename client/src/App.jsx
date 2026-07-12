import React, { useState } from 'react'
import { Box, Container, Flex, Text, SimpleGrid, Theme } from '@chakra-ui/react'
import { Provider } from './components/ui/provider'
import { SearchBar } from './components/SearchBar'
import { FinancialSummary } from './components/FinancialSummary'
import { RecommendationCard } from './components/RecommendationCard'
import { Terminal } from 'lucide-react'

const TICKER_DATA = {
  AAPL: {
    ticker: "AAPL",
    name: "Apple Inc.",
    consensus: "STRONG BUY",
    score: 8.4,
    status: "INVEST",
    summary: "Solid cash flow generation, strong services growth, and stable margins justify an INVEST action. Despite macro headwinds, product demand remains robust, and valuation is attractive relative to historical averages.",
    analystsCount: 42,
    targetPrice: "$210.00",
    upside: "+15.0%",
    metrics: [
      { label: "Share Price", value: "$182.63", change: "+1.24%", changeType: "positive" },
      { label: "Market Cap", value: "$2.85T", changeType: "neutral" },
      { label: "P/E Ratio", value: "28.45", changeType: "neutral" },
      { label: "Dividend Yield", value: "0.52%", changeType: "neutral" },
      { label: "Volume (Avg)", value: "52.4M", changeType: "neutral" },
      { label: "52W High", value: "$199.62", changeType: "neutral" },
      { label: "52W Low", value: "$164.08", changeType: "neutral" },
      { label: "Beta (Volatility)", value: "1.28", change: "+0.02", changeType: "positive" },
    ]
  },
  NVDA: {
    ticker: "NVDA",
    name: "NVIDIA Corp.",
    consensus: "STRONG BUY",
    score: 9.6,
    status: "INVEST",
    summary: "Unparalleled dominance in AI computing, accelerating data center revenue, and gross margins exceeding 75% support an INVEST stance. NVDA remains the premier hardware choice for generative AI infrastructure.",
    analystsCount: 56,
    targetPrice: "$140.00",
    upside: "+28.4%",
    metrics: [
      { label: "Share Price", value: "$128.20", change: "+4.82%", changeType: "positive" },
      { label: "Market Cap", value: "$3.15T", changeType: "neutral" },
      { label: "P/E Ratio", value: "68.20", changeType: "neutral" },
      { label: "Dividend Yield", value: "0.03%", changeType: "neutral" },
      { label: "Volume (Avg)", value: "248.1M", changeType: "neutral" },
      { label: "52W High", value: "$140.76", changeType: "neutral" },
      { label: "52W Low", value: "$45.01", changeType: "neutral" },
      { label: "Beta (Volatility)", value: "1.85", change: "+0.08", changeType: "positive" },
    ]
  },
  TSLA: {
    ticker: "TSLA",
    name: "Tesla Inc.",
    consensus: "UNDERPERFORM",
    score: 4.2,
    status: "PASS",
    summary: "Declining delivery volumes, price-cut pressures leading to margin compression, and intensifying global EV competition justify a PASS action. Wait for stabilization of auto margins and progress in autonomous driving projects.",
    analystsCount: 38,
    targetPrice: "$165.00",
    upside: "-12.5%",
    metrics: [
      { label: "Share Price", value: "$188.50", change: "-2.45%", changeType: "negative" },
      { label: "Market Cap", value: "$598B", changeType: "neutral" },
      { label: "P/E Ratio", value: "54.10", changeType: "neutral" },
      { label: "Dividend Yield", value: "N/A", changeType: "neutral" },
      { label: "Volume (Avg)", value: "88.6M", changeType: "neutral" },
      { label: "52W High", value: "$299.29", changeType: "neutral" },
      { label: "52W Low", value: "$138.80", changeType: "neutral" },
      { label: "Beta (Volatility)", value: "2.10", change: "+0.15", changeType: "positive" },
    ]
  },
  MSFT: {
    ticker: "MSFT",
    name: "Microsoft Corp.",
    consensus: "BUY",
    score: 8.9,
    status: "INVEST",
    summary: "Azure Cloud expansion driven by early monetization of GitHub Copilot and Office AI subscriptions justifies an INVEST action. Free cash flow is robust, and capital returns remain steady.",
    analystsCount: 48,
    targetPrice: "$465.00",
    upside: "+10.2%",
    metrics: [
      { label: "Share Price", value: "$421.90", change: "+0.85%", changeType: "positive" },
      { label: "Market Cap", value: "$3.13T", changeType: "neutral" },
      { label: "P/E Ratio", value: "35.12", changeType: "neutral" },
      { label: "Dividend Yield", value: "0.71%", changeType: "neutral" },
      { label: "Volume (Avg)", value: "22.8M", changeType: "neutral" },
      { label: "52W High", value: "$433.60", changeType: "neutral" },
      { label: "52W Low", value: "$315.18", changeType: "neutral" },
      { label: "Beta (Volatility)", value: "0.89", change: "-0.01", changeType: "negative" },
    ]
  }
}

function MainDashboard() {
  const [searchVal, setSearchVal] = useState('')
  const [activeTicker, setActiveTicker] = useState('AAPL')

  const currentData = TICKER_DATA[activeTicker.toUpperCase()] || TICKER_DATA.AAPL

  const handleSearchSubmit = (value) => {
    const cleanVal = value.trim().toUpperCase()
    if (TICKER_DATA[cleanVal]) {
      setActiveTicker(cleanVal)
    } else {
      alert(`Ticker "${cleanVal}" not found in local mock terminal database. Try AAPL, NVDA, TSLA, or MSFT.`)
    }
  }

  const handleQuickSelect = (ticker) => {
    setActiveTicker(ticker)
    setSearchVal(ticker)
  }

  return (
    <Box minHeight="100vh" bg="bg" color="text.primary" py="6" px="4">
      <Container maxW="1200px" px="0">
        
        {/* Terminal Header */}
        <Flex justify="space-between" align="center" borderBottom="1px solid" borderColor="border" pb="3" mb="6">
          <Flex align="center" gap="2">
            <Box color="positive">
              <Terminal size={18} />
            </Box>
            <Text fontFamily="mono" fontSize="14px" fontWeight="bold" letterSpacing="0.05em">
              INVESTMENT RESEARCH TERMINAL // SYS_VER_1.0.0
            </Text>
          </Flex>
          <Flex align="center" gap="4">
            <Flex align="center" gap="1.5">
              <Box w="6px" h="6px" borderRadius="full" bg="positive" />
              <Text fontFamily="mono" fontSize="11px" color="positive">
                ONLINE
              </Text>
            </Flex>
            <Text fontFamily="mono" fontSize="11px" color="text.muted">
              {new Date().toISOString().slice(0, 19).replace('T', ' ')} UTC
            </Text>
          </Flex>
        </Flex>

        {/* Search & Quick Selector */}
        <Flex direction={{ base: "column", md: "row" }} gap="4" mb="6" align={{ md: "center" }}>
          <Box flex="1">
            <SearchBar 
              value={searchVal} 
              onChange={setSearchVal} 
              onSubmit={handleSearchSubmit} 
            />
          </Box>
          <Flex gap="1.5" wrap="wrap" align="center">
            <Text fontSize="11px" fontFamily="mono" color="text.muted" mr="1">
              QUICK SELECT:
            </Text>
            {Object.keys(TICKER_DATA).map((ticker) => (
              <Box
                key={ticker}
                as="button"
                onClick={() => handleQuickSelect(ticker)}
                border="1px solid"
                borderColor={activeTicker === ticker ? "positive" : "border"}
                color={activeTicker === ticker ? "positive" : "text.muted"}
                bg={activeTicker === ticker ? "rgba(0, 208, 132, 0.05)" : "surface"}
                fontFamily="mono"
                fontSize="11px"
                fontWeight="bold"
                px="2"
                py="1"
                borderRadius="sm"
                cursor="pointer"
                transition="all 0.15s ease"
                _hover={{ borderColor: "text.muted", color: "text.primary" }}
              >
                {ticker}
              </Box>
            ))}
          </Flex>
        </Flex>

        {/* Ticker Overview Header */}
        <Box bg="surface" border="1px solid" borderColor="border" borderRadius="sm" p="3" mb="4">
          <Flex align="baseline" gap="3">
            <Text fontFamily="mono" fontSize="20px" fontWeight="bold" color="text.primary">
              {currentData.ticker}:US
            </Text>
            <Text fontFamily="body" fontSize="13px" fontWeight="medium" color="text.muted">
              {currentData.name.toUpperCase()}
            </Text>
            <Box w="1px" h="12px" bg="border" alignSelf="center" />
            <Text fontFamily="mono" fontSize="11px" color={currentData.status === 'INVEST' ? 'positive' : 'negative'}>
              SYS_REC: {currentData.status}
            </Text>
          </Flex>
        </Box>

        {/* Main Workspace Layout */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap="4">
          {/* Left / Middle: Financial Summary & Metrics Grid */}
          <Box gridColumn={{ lg: "span 2" }} display="flex" flexDirection="column" gap="4">
            <Box bg="surface" border="1px solid" borderColor="border" borderRadius="sm" p="3">
              <Text 
                fontSize="11px" 
                fontWeight="bold" 
                color="text.muted" 
                fontVariant="all-small-caps" 
                letterSpacing="0.08em" 
                mb="3"
                fontFamily="body"
              >
                Financial & Market Parameters
              </Text>
              <FinancialSummary metrics={currentData.metrics} />
            </Box>
          </Box>

          {/* Right: Recommendation Card */}
          <Box display="flex">
            <RecommendationCard recommendation={currentData} />
          </Box>
        </SimpleGrid>

        {/* Bottom Status / Log Bar */}
        <Box mt="6" bg="surface" border="1px solid" borderColor="border" borderRadius="sm" p="2">
          <Text fontFamily="mono" fontSize="11px" color="text.muted">
            SYSTEM DIAGNOSTICS: RUNNING // DB_OK // NET_ESTABLISHED // CACHE_LOADED_OK
          </Text>
        </Box>

      </Container>
    </Box>
  )
}

function App() {
  return (
    <Provider>
      <Theme appearance="dark">
        <MainDashboard />
      </Theme>
    </Provider>
  )
}

export default App
