import React from 'react'
import { Box, Flex, Text, Separator, SimpleGrid } from '@chakra-ui/react'

export function RecommendationCard({ recommendation }) {
  const defaultRec = {
    consensus: "Strong Buy",
    status: "INVEST",
    summary: "Solid cash flow generation, strong services growth, and stable margins justify an INVEST action. Despite macro headwinds, product demand remains robust, and valuation is attractive relative to historical averages.",
    targetPrice: "$210.00",
    upside: "+15.0%"
  }

  const rec = recommendation || defaultRec
  const isInvest = rec.status === "INVEST"
  const decisionColor = isInvest ? "positive" : "negative"

  return (
    <Box width="100%">
      <Flex direction="column" gap="4">
        {/* Large serif decision headline */}
        <Box>
          <Text fontSize="12px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.08em" mb="2">
            Investment Verdict
          </Text>
          <Text fontSize="28px" fontWeight="bold" fontFamily="heading" color="text.primary" lineHeight="1.2">
            Research stance: <Text as="span" color={decisionColor}>{rec.status}</Text>
          </Text>
        </Box>

        <Separator borderColor="border" borderWidth="1px" />

        {/* Editorial consensus and targets */}
        <SimpleGrid columns={2} gap="4">
          <Box>
            <Text fontSize="11px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.05em">
              Analyst Consensus
            </Text>
            <Text fontSize="15px" fontWeight="bold" color="text.primary" fontFamily="heading" mt="1">
              {rec.consensus}
            </Text>
          </Box>
          <Box>
            <Text fontSize="11px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.05em">
              Projected Targets
            </Text>
            <Text fontSize="15px" fontWeight="bold" color="text.primary" fontFamily="heading" mt="1">
              {rec.targetPrice} ({rec.upside})
            </Text>
          </Box>
        </SimpleGrid>

        <Separator borderColor="border" borderWidth="1px" />

        {/* Reasoning summary in Serif */}
        <Box>
          <Text fontSize="12px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.08em" mb="2">
            Detailed Reasoning
          </Text>
          <Text fontSize="16px" fontFamily="heading" lineHeight="1.7" color="text.primary">
            {rec.summary}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
