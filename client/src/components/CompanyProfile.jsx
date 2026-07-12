import React from 'react'
import { Box, Flex, Text, Badge } from '@chakra-ui/react'
import { Building2 } from 'lucide-react'

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
    <Box
      bg="surface"
      border="1px solid"
      borderColor="border"
      borderRadius="xl"
      p="6"
      boxShadow="sm"
      width="100%"
    >
      <Flex align="center" gap="3" mb="4">
        <Flex
          bg="rgba(15, 110, 86, 0.08)"
          color="brand"
          w="44px"
          h="44px"
          borderRadius="lg"
          align="center"
          justify="center"
        >
          <Building2 size={22} />
        </Flex>
        <Box>
          <Flex align="baseline" gap="2">
            <Text fontSize="18px" fontWeight="bold" color="text.primary">
              {data.name}
            </Text>
            <Badge 
              bg="rgba(15, 110, 86, 0.1)" 
              color="brand" 
              fontSize="12px" 
              fontWeight="bold" 
              px="2" 
              py="0.5" 
              borderRadius="md"
              textTransform="none"
            >
              {data.ticker}
            </Badge>
          </Flex>
          <Text fontSize="13px" color="text.muted" fontWeight="medium">
            {data.sector} • {data.industry}
          </Text>
        </Box>
      </Flex>

      <Text fontSize="15px" lineHeight="1.6" color="text.primary" mb="5" fontWeight="normal">
        {data.description}
      </Text>

      <Flex wrap="wrap" gap="6" borderTop="1px solid" borderColor="border" pt="4">
        <Box>
          <Text fontSize="11px" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="0.05em">
            CEO
          </Text>
          <Text fontSize="14px" fontWeight="semibold" color="text.primary" mt="0.5">
            {data.ceo}
          </Text>
        </Box>
        <Box>
          <Text fontSize="11px" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="0.05em">
            Employees
          </Text>
          <Text fontSize="14px" fontWeight="semibold" color="text.primary" mt="0.5">
            {data.employees}
          </Text>
        </Box>
        <Box>
          <Text fontSize="11px" fontWeight="bold" color="text.muted" textTransform="uppercase" letterSpacing="0.05em">
            Founded
          </Text>
          <Text fontSize="14px" fontWeight="semibold" color="text.primary" mt="0.5">
            {data.founded}
          </Text>
        </Box>
      </Flex>
    </Box>
  )
}
