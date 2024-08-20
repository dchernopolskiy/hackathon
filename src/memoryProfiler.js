const v8 = require('v8');
const fs = require('fs');
const path = require('path');

let lastUsage = process.memoryUsage();
let maxUsage = process.memoryUsage();

function formatBytes(bytes) {
  return (bytes / 1024 / 1024).toFixed(2) + ' MB';
}

function getMemoryDelta() {
  const currentUsage = process.memoryUsage();
  const delta = {};

  for (let key in currentUsage) {
    delta[key] = formatBytes(currentUsage[key] - lastUsage[key]);
    if (currentUsage[key] > maxUsage[key]) {
      maxUsage[key] = currentUsage[key];
    }
  }

  lastUsage = currentUsage;
  return delta;
}

function getHeapStatistics() {
  const stats = v8.getHeapStatistics();
  return {
    totalHeapSize: formatBytes(stats.total_heap_size),
    usedHeapSize: formatBytes(stats.used_heap_size),
    heapSizeLimit: formatBytes(stats.heap_size_limit),
    mallocedMemory: formatBytes(stats.malloced_memory),
    peakMallocedMemory: formatBytes(stats.peak_malloced_memory),
  };
}

function logMemoryUsage() {
  const delta = getMemoryDelta();
  const heapStats = getHeapStatistics();
  const timestamp = new Date().toISOString();

  const logMessage = `
${timestamp} - Memory Usage:
  Delta:
    RSS: ${delta.rss}
    Heap Total: ${delta.heapTotal}
    Heap Used: ${delta.heapUsed}
    External: ${delta.external}
    Array Buffers: ${delta.arrayBuffers}
  Heap Statistics:
    Total Heap Size: ${heapStats.totalHeapSize}
    Used Heap Size: ${heapStats.usedHeapSize}
    Heap Size Limit: ${heapStats.heapSizeLimit}
    Malloc Memory: ${heapStats.mallocedMemory}
    Peak Malloc Memory: ${heapStats.peakMallocedMemory}
`;

  console.log(logMessage);

  // Check for potential memory leak
  if (process.memoryUsage().heapUsed > 0.9 * v8.getHeapStatistics().heap_size_limit) {
    console.warn('POTENTIAL MEMORY LEAK DETECTED: Heap usage is over 90% of the heap size limit');
  }
}

function startMemoryProfiling(interval = 60000) {
  setInterval(logMemoryUsage, interval);
}

module.exports = { startMemoryProfiling };