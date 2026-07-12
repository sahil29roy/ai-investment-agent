import React from 'react'
import { Box, Flex, Text, Separator, SimpleGrid } from '@chakra-ui/react'

export function CompanyProfile({ company }) {
  const defaultCompany = {
    ticker: "AAPL",
    name: "Apple Inc.",
    sector: "Technology",
    industry: "Consumer Electronics",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide. In addition, the company offers various services, including Apple Music, Apple Pay, and iCloud. Apple is known for its focus on premium user experiences, hardware-software integration, and customer-first design ethos.",
    founded: "1976",
    ceo: "Tim Cook",
    employees: "164,000"
  }

  const data = company || defaultCompany

  return (
    <Box width="100%">
      <Flex direction="column" gap="4">
        {/* Editorial title */}
        <Box>
          <Flex align="baseline" justify="space-between">
            <Text fontSize="24px" fontWeight="bold" fontFamily="heading" color="text.primary">
              {data.name}
            </Text>
            <Text fontSize="14px" fontWeight="bold" fontFamily="body" color="text.muted">
              Ticker: {data.ticker}
            </Text>
          </Flex>
          <Text fontSize="12px" fontWeight="bold" color="text.muted" fontFamily="body" mt="1" textTransform="uppercase" letterSpacing="0.05em">
            {data.sector} • {data.industry}
          </Text>
        </Box>

        <Separator borderColor="border" borderWidth="1px" />

        {/* Serif description */}
        <Text fontSize="15px" lineHeight="1.7" fontFamily="heading" color="text.primary">
          {data.description}
        </Text>

        <Separator borderColor="border" borderWidth="1px" />

        {/* Flat metadata */}
        <SimpleGrid columns={3} gap="4">
          <Box>
            <Text fontSize="10px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.05em">
              Executive Officer
            </Text>
            <Text fontSize="14px" fontWeight="semibold" color="text.primary" fontFamily="body" mt="0.5">
              {data.ceo}
            </Text>
          </Box>
          <Box>
            <Text fontSize="10px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.05em">
              Total Labor Force
            </Text>
            <Text fontSize="14px" fontWeight="semibold" color="text.primary" fontFamily="body" mt="0.5">
              {data.employees}
            </Text>
          </Box>
          <Box>
            <Text fontSize="10px" fontWeight="bold" color="text.muted" fontFamily="body" textTransform="uppercase" letterSpacing="0.05em">
              Year Founded
            </Text>
            <Text fontSize="14px" fontWeight="semibold" color="text.primary" fontFamily="body" mt="0.5">
              {data.founded}
            </Text>
          </Box>
        </SimpleGrid>
      </Flex>
    </Box>
  )
}
