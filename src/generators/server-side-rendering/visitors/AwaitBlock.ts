import visit from '../visit';
import { SsrGenerator } from '../index';
import Block from '../Block';
import { Node } from '../../../interfaces';

export default function visitAwaitBlock(
	generator: SsrGenerator,
	block: Block,
	node: Node
) {
	block.contextualise(node.expression);
	const { dependencies, snippet } = node.metadata;

	// TODO should this be the generator's job? It's duplicated between
	// here and the equivalent DOM compiler visitor
	const contexts = new Map(block.contexts);
	contexts.set(node.value, '__value');

	const contextDependencies = new Map(block.contextDependencies);
	contextDependencies.set(node.value, dependencies);

	const childBlock = block.child({
		contextDependencies,
		contexts
	});

	generator.append('${(function(__value) { if(__isPromise(__value)) return `');

	node.pending.children.forEach((child: Node) => {
		visit(generator, childBlock, child);
	});

	generator.append('`; return `');

	node.then.children.forEach((child: Node) => {
		visit(generator, childBlock, child);
	});

	generator.append(`\`;}(${snippet})) }`);
}
