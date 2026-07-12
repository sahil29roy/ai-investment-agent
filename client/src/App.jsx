import React, { useState } from 'react'
import { Box, Container, Flex, Text, SimpleGrid, Theme } from '@chakra-ui/react'
import { Provider } from './components/ui/provider'
import { SearchBar } from './components/SearchBar'
import { CompanyProfile } from './components/CompanyProfile'
import { RecommendationCard } from './components/RecommendationCard'
import { NewsSection } from './components/NewsSection'
import { Compass } from 'lucide-react'

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

function MainDashboard() {
  const [searchVal, setSearchVal] = useState('')
  const [activeTicker, setActiveTicker] = useState('AAPL')

  const currentData = TICKER_DATA[activeTicker.toUpperCase()] || TICKER_DATA.AAPL

  const handleSearchSubmit = (value) => {
    const cleanVal = value.trim().toUpperCase()
    if (TICKER_DATA[cleanVal]) {
      setActiveTicker(cleanVal)
    } else {
      alert(`We couldn't find "${cleanVal}" in our current list. Try searching for AAPL, NVDA, TSLA, or MSFT.`)
    }
  }

  const handleQuickSelect = (ticker) => {
    setActiveTicker(ticker)
    setSearchVal(ticker)
  }

  return (
    <Box minHeight="100vh" bg="bg" color="text.primary" py="8" px="4">
      <Container maxW="1200px" px="0">
        
        {/* Friendly Top Header */}
        <Flex justify="space-between" align="center" borderBottom="1px solid" borderColor="border" pb="4" mb="8">
          <Flex align="center" gap="3">
            <Box color="brand" display="flex" alignItems="center">
              <Compass size={28} />
            </Box>
            <Box>
              <Text fontSize="18px" fontWeight="bold" color="brand" lineHeight="1.2">
                WealthInsight Portal
              </Text>
              <Text fontSize="12px" color="text.muted">
                Your reassuring, automated investment copilot
              </Text>
            </Box>
          </Flex>
          <Flex align="center" gap="4">
            <Box display={{ base: "none", sm: "block" }} textAlign="right">
              <Text fontSize="12px" fontWeight="semibold" color="text.primary">
                System Status: Ready
              </Text>
              <Text fontSize="11px" color="text.muted">
                Updated just now
              </Text>
            </Box>
          </Flex>
        </Flex>

        {/* Search & Quick Tickers with plenty of space (gap 8) */}
        <Flex direction="column" gap="4" mb="8">
          <SearchBar 
            value={searchVal} 
            onChange={setSearchVal} 
            onSubmit={handleSearchSubmit} 
          />
          <Flex gap="2" wrap="wrap" align="center">
            <Text fontSize="13px" fontWeight="semibold" color="text.muted" mr="2">
              Popular Stocks:
            </Text>
            {Object.keys(TICKER_DATA).map((ticker) => (
              <Box
                key={ticker}
                as="button"
                onClick={() => handleQuickSelect(ticker)}
                border="1px solid"
                borderColor={activeTicker === ticker ? "brand" : "border"}
                color={activeTicker === ticker ? "white" : "text.primary"}
                bg={activeTicker === ticker ? "brand" : "surface"}
                fontFamily="body"
                fontSize="13px"
                fontWeight="semibold"
                px="4"
                py="2"
                borderRadius="lg"
                cursor="pointer"
                transition="all 0.15s ease"
                boxShadow={activeTicker === ticker ? "sm" : "none"}
                _hover={{ borderColor: "brand", bg: activeTicker === ticker ? "brand" : "rgba(15, 110, 86, 0.05)" }}
              >
                {ticker} - {TICKER_DATA[ticker].name}
              </Box>
            ))}
          </Flex>
        </Flex>

        {/* Main Work Grid using plenty of spacing (gap="8") */}
        <SimpleGrid columns={{ base: 1, lg: 3 }} gap="8">
          {/* Left Column (span 2): Company Profile & News Section */}
          <Flex gridColumn={{ lg: "span 2" }} direction="column" gap="8">
            <CompanyProfile company={currentData.company} />
            <NewsSection news={currentData.news} />
          </Flex>

          {/* Right Column: Recommendation Card */}
          <Box display="flex" flexDirection="column" gap="8">
            <RecommendationCard recommendation={currentData} />
            
            {/* Friendly reassurance note card */}
            <Box bg="rgba(15, 110, 86, 0.04)" border="1px solid" borderColor="rgba(15, 110, 86, 0.15)" borderRadius="xl" p="5">
              <Text fontSize="13px" fontWeight="bold" color="brand" textTransform="uppercase" letterSpacing="0.05em" mb="2">
                Reassuring Guidance
              </Text>
              <Text fontSize="13px" lineHeight="1.5" color="text.primary">
                WealthInsight recommendations are generated by analyzing historical financials, modern analyst targets, and current news sentiment. Always consider your personal risk tolerance before executing trades.
              </Text>
            </Box>
          </Box>
        </SimpleGrid>

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
