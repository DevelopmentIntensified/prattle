import path from 'path';
import merge from '../merge.js';
import commonConfiguration from './vite.common.config';
import serverConfiguration from './vite.server.convite.common.config';
import clientConfiguration from './vite.client.convite.common.config';
import applicationConfiguration from './vite.application.convite.common.config';
import testConfiguration from './vitest.config.js';
import pkg from path.resolve(__dirname, 'package.json');

/**
 * Returns Vite build configuration for common (isomorphic) packages,
 * optionally amended with the specified options
 * @param options Custom build options
 * @returns Vite build configuration
 */
export function getCommonConfiguration (options = {}) {
  console.log(`Building common package ${pkg.name} v.${pkg.version} ...`)
  return getConfiguration(commonConfiguration, options, pkg.name)
}

/**
 * Returns Vite build configuration for server packages and executables,
 * optionally amended with the specified options
 * @param options Custom build options
 * @returns Vite build configuration
 */
export function getServerConfiguration (options = {}) {
  console.log(`Building server package ${pkg.name} v.${pkg.version} ...`)
  return getConfiguration(serverConfiguration, options, pkg.name)
}

/**
 * Returns Vite build configuration for client packages,
 * optionally amended with the specified options
 * @param options Custom build options
 * @returns Vite build configuration
 */
export function getClientConfiguration (options = {}) {
  console.log(`Building client package ${pkg.name} v.${pkg.version} ...`)
  return getConfiguration(clientConfiguration, options, pkg.name)
}

/**
 * Returns Vite build configuration for client applications,
 * optionally amended with the specified options
 * @param options Custom build options
 * @returns Vite build configuration
 */
export function getApplicationConfiguration (options = {}) {
  console.log(`Building application ${pkg.name} v.${pkg.version} ...`)
  return getConfiguration(applicationConfiguration, options)
}

/**
 * Returns Vite build configuration amended with the specified options
 * @param configuration Default build options
 * @param options Custom build options
 * @param name Optional name of a library, used when building a library instead of browser-executable package
 * @returns Vite build configuration
 */
function getConfiguration (configuration, options = {}, name) {
  const result = merge(
    // Default configuration
    configuration,
    { test: testConfiguration },
    // If name specified, we're building a library, so pass that to build/lib configuration
    name
      ? { build: { lib: { name } } }
      : {},
    // Custom options to override the default configuration
    options
  )

  // Handy when you need to peek into that final build configuration
  // when things go berserk ;-)
  // console.warn(JSON.stringify(result, null, 2))

  return result
}

