import React from 'react'
import { Box, Flex, Text } from '@chakra-ui/react'

export function RecommendationCard({ recommendation }) {
  const defaultRec = {
    ticker: "AAPL",
    name: "Apple Inc.",
    consensus: "STRONG BUY",
    score: 8.4,
    status: "INVEST", // 'INVEST' | 'PASS'
    summary: "Solid cash flow generation, strong services growth, and stable margins justify an INVEST action. Despite macro headwinds, product demand remains robust, and valuation is attractive relative to historical averages.",
    analystsCount: 42,
    targetPrice: "$210.00",
    upside: "+15.0%"
  }

  const rec = recommendation || defaultRec
  const isInvest = rec.status === "INVEST"
  const accentColor = isInvest ? "positive" : "negative"
  const isUpsidePositive = rec.upside && !rec.upside.startsWith('-')
  const upsideColor = isUpsidePositive ? "positive" : "negative"

  return (
    <Box
      bg="surface"
      border="1px solid"
      borderColor="border"
      borderRadius="sm"
      p="4"
      width="100%"
    >
      {/* Top Header */}
      <Flex justify="space-between" align="center" mb="3">
        <Flex align="center" gap="2">
          <Text
            fontFamily="mono"
            fontSize="16px"
            fontWeight="bold"
            color="text.primary"
          >
            {rec.ticker}
          </Text>
          <Text
            fontSize="12px"
            color="text.muted"
            fontFamily="body"
          >
            {rec.name}
          </Text>
        </Flex>
        {/* Recommendation Tag */}
        <Box
          border="1px solid"
          borderColor={accentColor}
          color={accentColor}
          fontSize="11px"
          fontWeight="bold"
          fontFamily="mono"
          px="2"
          py="0.5"
          borderRadius="sm"
          bg="transparent"
        >
          {rec.status}
        </Box>
      </Flex>

      {/* Main recommendation readout */}
      <Flex direction={{ base: "column", md: "row" }} gap="6" justify="space-between" mb="3">
        {/* Score & Consensus */}
        <Flex gap="6" align="center">
          <Box>
            <Text
              fontSize="10px"
              fontWeight="bold"
              color="text.muted"
              fontVariant="all-small-caps"
              letterSpacing="0.08em"
            >
              System Score
            </Text>
            <Text
              fontSize="28px"
              fontWeight="extrabold"
              fontFamily="mono"
              color="text.primary"
              lineHeight="1"
              mt="1"
            >
              {rec.score}
              <Text as="span" fontSize="14px" fontWeight="normal" color="text.muted" ml="1">
                / 10
              </Text>
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="10px"
              fontWeight="bold"
              color="text.muted"
              fontVariant="all-small-caps"
              letterSpacing="0.08em"
            >
              Consensus
            </Text>
            <Text
              fontSize="14px"
              fontWeight="bold"
              fontFamily="mono"
              color={accentColor}
              mt="1.5"
            >
              {rec.consensus}
            </Text>
          </Box>
        </Flex>

        {/* Targets */}
        <Flex gap="4" align="center">
          <Box>
            <Text
              fontSize="10px"
              fontWeight="bold"
              color="text.muted"
              fontVariant="all-small-caps"
              letterSpacing="0.08em"
            >
              Target Price
            </Text>
            <Text
              fontSize="14px"
              fontFamily="mono"
              fontWeight="semibold"
              color="text.primary"
              mt="1"
            >
              {rec.targetPrice}
            </Text>
          </Box>
          <Box>
            <Text
              fontSize="10px"
              fontWeight="bold"
              color="text.muted"
              fontVariant="all-small-caps"
              letterSpacing="0.08em"
            >
              Projected Upside
            </Text>
            <Text
              fontSize="14px"
              fontFamily="mono"
              fontWeight="semibold"
              color={upsideColor}
              mt="1"
            >
              {rec.upside}
            </Text>
          </Box>
        </Flex>
      </Flex>

      {/* Separator / Divider */}
      <Box height="1px" bg="border" my="3" />

      {/* Summary Prose */}
      <Box>
        <Text
          fontSize="10px"
          fontWeight="bold"
          color="text.muted"
          fontVariant="all-small-caps"
          letterSpacing="0.08em"
          mb="1"
        >
          Research Verdict
        </Text>
        <Text
          fontSize="13px"
          lineHeight="1.5"
          color="text.primary"
          fontFamily="body"
        >
          {rec.summary}
        </Text>
      </Box>

      {/* System diagnostics footer */}
      <Flex mt="3" justify="space-between" fontSize="10px" fontFamily="mono" color="text.muted">
        <Text>ANALYSTS WATCHING: {rec.analystsCount}</Text>
        <Text>STATUS: COMPILED OK</Text>
      </Flex>
    </Box>
  )
}
