/**
 * @Author: Costardi Paolo @ Tech-Farm Srl
 * @Date:   2023-05-15 14:37:02
 * @Last Modified by:   Costardi Paolo @ Tech-Farm Srl
 * @Last Modified time: 2023-05-23 08:31:58
 */
import { BehaviorSubject } from 'rxjs';

export abstract class PrintDriver {
    public abstract isConnected: BehaviorSubject<boolean>;
    public abstract connect(): void;
    public abstract write(data: any): Promise<void>;
    public abstract get isSupported(): boolean;
}