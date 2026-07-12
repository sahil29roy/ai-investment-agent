import React from 'react'
import { Box, Flex, Text, Separator } from '@chakra-ui/react'

export function FinancialSummary({ metrics }) {
  const defaultMetrics = [
    { label: "Share Price", value: "$210.00", change: "+1.2%" },
    { label: "Market Cap", value: "$3.15T" },
    { label: "P/E Ratio", value: "28.4" },
    { label: "Dividend Yield", value: "0.52%" },
    { label: "Volume (Avg)", value: "52.4M" },
    { label: "52W High", value: "$220.00" },
    { label: "52W Low", value: "$165.00" },
    { label: "Beta (Volatility)", value: "1.24" }
  ]

  const items = metrics || defaultMetrics

  return (
    <Box width="100%">
      <Flex direction="column" gap="0">
        {items.map((item, index) => (
          <Box key={index}>
            <Flex justify="space-between" align="baseline" py="2">
              {/* Sans-serif label */}
              <Text fontSize="13px" fontWeight="bold" color="text.muted" fontFamily="body">
                {item.label}
              </Text>
              
              {/* Serif value */}
              <Flex align="baseline" gap="2">
                <Text fontSize="16px" fontWeight="bold" color="text.primary" fontFamily="heading">
                  {item.value}
                </Text>
                {item.change && (
                  <Text fontSize="12px" fontWeight="bold" color="text.muted" fontFamily="body">
                    ({item.change})
                  </Text>
                )}
              </Flex>
            </Flex>
            <Separator borderColor="border" borderWidth="1px" />
          </Box>
        ))}
      </Flex>
    </Box>
  )
}
