import React from 'react'
import { SimpleGrid, Box, Text, Flex } from '@chakra-ui/react'
import { ArrowUpRight, ArrowDownRight } from 'lucide-react'

export function MetricCard({ label, value, change, isMonospace = true, changeType }) {
  const isPositive = changeType === 'positive' || (change && parseFloat(change) > 0)
  const isNegative = changeType === 'negative' || (change && parseFloat(change) < 0)
  
  let changeColor = 'text.muted'
  if (isPositive) changeColor = 'positive'
  if (isNegative) changeColor = 'negative'

  return (
    <Box
      bg="surface"
      border="1px solid"
      borderColor="border"
      borderRadius="sm"
      p="3"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      height="72px"
    >
      <Text
        fontSize="11px"
        fontWeight="bold"
        color="text.muted"
        textTransform="uppercase"
        fontVariant="all-small-caps"
        letterSpacing="0.08em"
        fontFamily="body"
      >
        {label}
      </Text>
      <Flex align="baseline" justify="space-between" mt="1">
        <Text
          fontSize="18px"
          fontWeight="semibold"
          fontFamily={isMonospace ? 'mono' : 'body'}
          color="text.primary"
          lineHeight="1.1"
          letterSpacing="-0.02em"
        >
          {value}
        </Text>
        {change !== undefined && (
          <Flex align="center" gap="0.5" color={changeColor} fontSize="11px" fontFamily="mono">
            {isPositive && <ArrowUpRight size={10} />}
            {isNegative && <ArrowDownRight size={10} />}
            <Text as="span">{change}</Text>
          </Flex>
        )}
      </Flex>
    </Box>
  )
}

export function FinancialSummary({ metrics }) {
  const defaultMetrics = [
    { label: "Share Price", value: "$182.63", change: "+1.24%", changeType: "positive" },
    { label: "Market Cap", value: "$2.85T", changeType: "neutral" },
    { label: "P/E Ratio", value: "28.45", changeType: "neutral" },
    { label: "Dividend Yield", value: "0.52%", changeType: "neutral" },
    { label: "Volume (Avg)", value: "52.4M", changeType: "neutral" },
    { label: "52W High", value: "$199.62", changeType: "neutral" },
    { label: "52W Low", value: "$164.08", changeType: "neutral" },
    { label: "Beta (Volatility)", value: "1.28", change: "+0.02", changeType: "positive" },
  ]

  const displayMetrics = metrics || defaultMetrics

  return (
    <SimpleGrid columns={{ base: 2, md: 4 }} gap="2" width="100%">
      {displayMetrics.map((metric, index) => (
        <MetricCard
          key={index}
          label={metric.label}
          value={metric.value}
          change={metric.change}
          changeType={metric.changeType}
        />
      ))}
    </SimpleGrid>
  )
}
