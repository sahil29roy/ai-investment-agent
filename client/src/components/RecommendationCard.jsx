import React from 'react'
import { Box, Flex, Text, Progress, Button } from '@chakra-ui/react'
import { ShieldCheck, ArrowUpRight } from 'lucide-react'

export function RecommendationCard({ recommendation }) {
  const defaultRec = {
    ticker: "AAPL",
    name: "Apple Inc.",
    consensus: "Strong Buy",
    score: 8.4,
    status: "INVEST",
    summary: "Solid cash flow generation, strong services growth, and stable margins justify an INVEST action. Despite macro headwinds, product demand remains robust, and valuation is attractive relative to historical averages.",
    analystsCount: 42,
    targetPrice: "$210.00",
    upside: "+15.0%"
  }

  const rec = recommendation || defaultRec
  const isInvest = rec.status === "INVEST"
  const confidencePercent = rec.score * 10

  return (
    <Box
      bg="surface"
      border="1px solid"
      borderColor="border"
      borderRadius="xl"
      p="6"
      boxShadow="sm"
      width="100%"
      display="flex"
      flexDirection="column"
      gap="4"
    >
      {/* Reassuring badge header */}
      <Flex justify="space-between" align="center">
        <Text fontSize="13px" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="0.05em">
          Our Recommendation
        </Text>
        <Flex
          bg={isInvest ? "rgba(15, 110, 86, 0.08)" : "gray.100"}
          border="1px solid"
          borderColor={isInvest ? "brand" : "gray.300"}
          color={isInvest ? "brand" : "gray.700"}
          px="3"
          py="1"
          borderRadius="lg"
          align="center"
          gap="1.5"
          fontWeight="bold"
          fontSize="14px"
        >
          <ShieldCheck size={16} />
          {rec.status}
        </Flex>
      </Flex>

      {/* Consensus & Confidence */}
      <Box mt="2">
        <Text fontSize="14px" fontWeight="medium" color="text.muted" mb="1.5">
          Consensus: <Text as="span" fontWeight="bold" color={isInvest ? "brand" : "text.primary"}>{rec.consensus}</Text>
        </Text>
        
        {/* Reassuring confidence horizontal bar instead of number */}
        <Box mt="3" mb="1">
          <Flex justify="space-between" align="center" mb="1.5">
            <Text fontSize="13px" fontWeight="semibold" color="text.primary">
              Analysis Confidence
            </Text>
            <Text fontSize="13px" fontWeight="medium" color="text.muted">
              {isInvest ? "High" : "Moderate"}
            </Text>
          </Flex>
          
          <Progress.Root value={confidencePercent}>
            <Progress.Track bg="gray.100" height="8px" borderRadius="full">
              <Progress.Range bg="brand" borderRadius="full" />
            </Progress.Track>
          </Progress.Root>
        </Box>
      </Box>

      {/* Target Price & Upside */}
      <Flex justify="space-between" borderTop="1px solid" borderBottom="1px solid" borderColor="border" py="3" my="1">
        <Box>
          <Text fontSize="11px" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="0.05em">
            Target Price
          </Text>
          <Text fontSize="16px" fontWeight="bold" color="text.primary" mt="0.5">
            {rec.targetPrice}
          </Text>
        </Box>
        <Box textAlign="right">
          <Text fontSize="11px" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="0.05em">
            Projected Upside
          </Text>
          <Flex align="center" gap="1" justify="flex-end" mt="0.5">
            {isInvest && <ArrowUpRight size={14} />}
            <Text fontSize="16px" fontWeight="bold" color={isInvest ? "brand" : "text.primary"}>
              {rec.upside}
            </Text>
          </Flex>
        </Box>
      </Flex>

      {/* Reassuring explanation */}
      <Box>
        <Text fontSize="15px" lineHeight="1.6" color="text.primary">
          {rec.summary}
        </Text>
      </Box>

      {/* CTA Button using primary color sparingly */}
      <Button
        bg="brand"
        color="white"
        _hover={{ bg: "#0c5a46" }}
        borderRadius="lg"
        height="44px"
        width="100%"
        fontWeight="bold"
        fontSize="14px"
        cursor="pointer"
        mt="2"
      >
        Add to My Portfolio
      </Button>
    </Box>
  )
}
